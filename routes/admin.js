const router = require("express").Router();
require("dotenv").config();
const auth = require("../middleware/auth");
const pool = require("../db");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

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

const base64Encode = strToEncode => Buffer.from(strToEncode).toString("base64");

router.post("/admin/email-league", auth, async (req, res) => {
  try {
    const { subjectLine, emailBody } = req.body;
    const getEmails = await pool.query("SELECT user_email FROM users");
    const emailList = getEmails.rows;

    emailList.forEach(user => {
      const rawEmail = user.user_email;
      // const encodedEmail = Buffer.from(rawEmail).toString("base64");
      const encodedEmail = base64Encode(rawEmail);

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

router.post("/admin/request-password-reset", async (req, res) => {
  const { emailForPassReset } = req.body;
  try {
    const isValidAdminCreds = await pool.query(
      "SELECT admin_email, admin_password FROM admin WHERE admin_email = $1",
      [emailForPassReset]
    );

    // admin email not on file
    if (isValidAdminCreds.rows.length !== 1) {
      return res.status(401).json("Invalid Admin Email");
    }

    const hashedPassword = isValidAdminCreds.rows[0].admin_password;
    const secret = process.env.JWT_SECRET + hashedPassword;
    const encodedEmail = base64Encode(emailForPassReset);
    const payload = {
      encodedEmail,
    };

    const passwordResetToken = jwt.sign(payload, secret, {
      expiresIn: "15 min",
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: emailForPassReset,
      subject: "Reset Password",
      html: `
			<p>Use the link below to reset your password. Link expires in 15 minutes.</p>
			<div>
				<a href="http://localhost:3000/resetpassword/${encodedEmail}/${passwordResetToken}">Click here to reset admin password</a>
			</div>
			<br>
			<small>Please do not reply to this email.</small>
			`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        res.json("Password reset email sent. Follow instructions in email.");
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
});

router.put("/admin/resetpassword/:email/:resetToken?", async (req, res) => {
  const { email, token: resetToken } = req.params;
  const { password } = req.body;
  const authTokenFromLocalStorage = req.header("token");

  try {
    const quereyOldPassword = await pool.query(
      "SELECT admin_password FROM admin WHERE admin_email = $1",
      [email]
    );

    if (resetToken) {
      const oldHashedPassword = quereyOldPassword.rows[0].admin_password;
      const secret = process.env.JWT_SECRET + oldHashedPassword;
      jwt.verify(token, secret);
    }

    if (authTokenFromLocalStorage) {
      jwt.verify(authTokenFromLocalStorage, process.env.JWT_SECRET);
    }

    const updatedPassword = await saltPass(password);

    await pool.query(
      "UPDATE admin SET admin_password = $1 WHERE admin_email = $2",
      [updatedPassword, email]
    );

    res.json("Success. Your password has been reset.");
  } catch (error) {
    console.error(error.message);
    res.json(
      `Error could not reset password. Please request a new password reset.`
    );
  }
});

const saltPass = async password => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hash(password, salt);
  return hashedPassword;
};

router.get("/admin/is-verified", auth, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    res.status(500).json("Server Error");
    console.error(err.message);
  }
});

module.exports = router;
