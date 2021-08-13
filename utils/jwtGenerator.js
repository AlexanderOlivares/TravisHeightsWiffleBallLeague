const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(name, email) {
  const payload = {
    name,
    email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}

module.exports = jwtGenerator;
