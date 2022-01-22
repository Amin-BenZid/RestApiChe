const mongoose = require("mongoose");

let schemaUser = mongoose.Schema({
  name: String,
  age: Number,
});

var Student = mongoose.model("student", schemaUser);

module.exports = Student;
