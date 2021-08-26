const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json("Not Authorized. No token.");
    }

    jwt.verify(jwtToken, process.env.JWT_SECRET);
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Authorized");
  }
  next();
};
