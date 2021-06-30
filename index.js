require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// app.post("/api/join", async (req, res) => {
//   try {
//     const { name, email, daysUserCanPlay } = req.body;
//     console.log(name, email, daysUserCanPlay);
//     res.json("you have joined the league");
//   } catch (error) {
//     console.error(error.message);
//     // res.status(404);
//     res.json(error.message);
//   }
// });

app.post("/api/rsvp", async (req, res) => {
  try {
    res.json();
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
