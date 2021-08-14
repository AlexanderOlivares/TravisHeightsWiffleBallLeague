const router = require("express").Router();
require("dotenv").config();
const auth = require("../middleware/auth");
const pool = require("../db");

router.get("/admin/users", auth, async (req, res) => {
  try {
    const userList = await pool.query("SELECT * FROM users");

    res.json(userList.rows);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

router.get("/admin/rsvp", auth, async (req, res) => {
  try {
    const rsvpList = await pool.query("SELECT * FROM rsvp");

    res.json(rsvpList.rows);
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

router.post("/admin/email-league", auth, async (req, res) => {
  try {
    const { subjectLine, emailBody } = req.body;
    const getEmails = await pool.query("SELECT user_email FROM users");
    const emailList = getEmails.rows;

    emailList.forEach(user => {
      const rawEmail = user.user_email;
      const encodedEmail = Buffer.from(rawEmail).toString("base64");

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user.user_email,
        subject: subjectLine,
        html: `
    	<p>${emailBody}</p>
			<div>
				<a href="http://localhost:3000/rsvp/${encodedEmail}">Click here to RSVP</a>
			</div>
    	<br>
    	<br>
    	<br>
    	<br>
    	<br>
    	<br>
    	<br>
    	<br>
    	<br>
    	<small>Please do not reply to this email.</small>
    	<small>
    		<a href="https://wiffle.herokuapp.com/unsubscribe">Unsubscribe</a>
    	</small>
    	`,
      };

      // COMMENT OUT TO PREVENT EMAILING DURING DEVELOPMENT
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          res.json("Email sent successfully");
          console.log("Email sent: " + info.response);
        }
      });
    });
  } catch (error) {
    console.error(error.message);
    res.json(`Error couldn't send emails: ${error.message}`);
  }
});

// const saltPass = async password => {
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = bcrypt.hash(password, salt);
//   return hashedPassword;
// };

module.exports = router;
