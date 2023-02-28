const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router");

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

mongoose.connect(
  "mongodb://127.0.0.1:27017/students",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully Connected");
    }
  }
);

app.listen(5000, () => {
  console.log("on port 5000");
});

module.exports = app;
