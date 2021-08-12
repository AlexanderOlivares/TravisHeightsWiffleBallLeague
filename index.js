require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const path = require("path");
app.use(cors());
app.use(express.json());
const pool = require("./db");
const nodemailer = require("nodemailer");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.post("/api/join", async (req, res) => {
  try {
    const { name, email, daysUserCanPlay } = req.body;
    console.log(name, email, daysUserCanPlay);

    const emailCheck = await pool.query(
      "SELECT user_email FROM users WHERE user_email = $1",
      [email]
    );

    // User email is already on file
    if (emailCheck.rows.length > 0) {
      return res.json(
        "You are already signed up for the league! Pleae rsvp for the next game"
      );
    }

    // Adds user to league
    await pool.query(
      "INSERT INTO users (user_email, user_name, days_can_play) VALUES ($1, $2, $3)",
      [email, name, daysUserCanPlay]
    );

    res.json(
      "Woo-hoo! You have joined the league! We will email you about upcoming games."
    );

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Thanks for signing up!",
      html: `
			<p>We will email you about upcoming games. Can't wait to see you out there!</p>
			<br>
			<small>Please do not reply to this email.</small>
			<small>
				<a href="https://wiffle.herokuapp.com/unsubscribe">Unsubscribe</a>
			</small>
			`,
    };

    // sends the welcome email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.error(error.message);
    res.json(
      "Oops there was an error on our end. Please try again later or email us directly at travisheightwiffleball@gmail.com to join the league."
    );
  }
});

app.post("/api/rsvp", async (req, res) => {
  try {
    const { userEmail: email, RSVP_BOOL: attending } = req.body;
    console.log(email, attending);

    const emailCheck = await pool.query(
      "SELECT user_email FROM users WHERE user_email = $1",
      [email]
    );

    console.log(emailCheck.rows.length);

    // User hasn't joined the league yet. No email is on file
    if (!emailCheck.rows.length) {
      res.json(false);
      return;
    }

    // check if user has already submitted an rsvp
    const changeRsvpCheck = await pool.query(
      "SELECT user_email FROM rsvp WHERE user_email = $1",
      [email]
    );

    // if already rsvp'd update with new status
    if (changeRsvpCheck.rows.length === 1) {
      await pool.query(
        "UPDATE rsvp SET can_attend = $1 WHERE user_email = $2",
        [attending, email]
      );
    } else {
      await pool.query(
        "INSERT INTO rsvp (user_email, can_attend) VALUES ($1, $2)",
        [email, attending]
      );
    }

    res.json("Thanks for letting us know!");
  } catch (error) {
    res.status(500);
    res.json(
      "Oops there was an error on our end. Please try again later or email us directly at travisheightwiffleball@gmail.com to rsvp"
    );
  }
});

app.post("/api/unsubscribe", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const emailCheck = await pool.query(
      "SELECT user_email FROM users WHERE user_email = $1",
      [email]
    );

    // User hasn't joined the league yet. No email is on file
    if (!emailCheck.rows.length) {
      return res.json("You are not currently subscribed");
    }

    const response = await pool.query(
      "DELETE FROM users WHERE user_email = $1",
      [email]
    );

    res.json("Successfully unsubscribed. Sad to see you go...");
  } catch (error) {
    res.json(
      "Oops there was an error on our end. Please try again later or email us directly at travisheightwiffleball@gmail.com to be removed from our list"
    );
  }
});

//////////////////////
// admin stuff below
//////////////////////

app.get("/api/admin/users", async (req, res) => {
  try {
    const userList = await pool.query("SELECT * FROM users");

    res.json(userList.rows);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.get("/api/admin/rsvp", async (req, res) => {
  try {
    const rsvpList = await pool.query("SELECT * FROM rsvp");

    res.json(rsvpList.rows);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

app.post("/api/admin/email-league", async (req, res) => {
  try {
    const { subjectLine, emailBody } = req.body;
    const getEmails = await pool.query("SELECT user_email FROM users");
    const emailList = getEmails.rows;
    console.log(subjectLine, emailBody);

    emailList.forEach(user => {
      const uniqueLinkId = "encoded email goes here";
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user.user_email,
        subject: subjectLine,
        html: `
    	<p>${emailBody}</p>
    	<br>
			<p> Rsvp:
				<a href="http://localhost:5000/rsvp/${uniqueLinkId}</a>
			</p>
    	<small>Please do not reply to this email.</small>
    	<small>
    		<a href="https://wiffle.herokuapp.com/unsubscribe">Unsubscribe</a>
    	</small>
    	`,
      };

      // COMMENTED OUT TO PREVENT EMAILING DURING DEVELOPMENT
      //   transporter.sendMail(mailOptions, (error, info) => {
      //     if (error) {
      //       console.log(error);
      //     } else {
      //       res.json("Email sent successfully");
      //       console.log("Email sent: " + info.response);
      //     }
      //   });
    });
  } catch (error) {
    console.error(error.message);
    res.json(`Error couldn't send emails: ${error.message}`);
  }
});

app.get("*", (req, res) => {
  // res.sendFile(path.join(__dirname, "client/build/index.html"));
  res.redirect("https://wiffle.herokuapp.com/");
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
