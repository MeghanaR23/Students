const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
  name: String,
  major: String,
  address: {
    state: String,
    zip: String,
    address_1: String,
    address_2: String,
    city: String,
  },
});

const studentsmodel = mongoose.model("Students", studentsSchema);

module.exports = studentsmodel;
