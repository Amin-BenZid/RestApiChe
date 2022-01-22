const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
var Users = require("./models/User");
let urlDb = process.env.URL;
app.use(express.json());
//connectiong to the database
mongoose
  .connect(urlDb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected !");
  })
  .catch((err) => console.log(err));
//  getting all the users
app.get("/", (req, res) => {
  res.send(Users.users);
});
// adding users
app.post("/users", async (req, res) => {
  const data = req.body;
  try {
    const user = await Users.create(data);
    if (user) res.send(JSON.stringify(user));
  } catch (err) {
    res.send(err);
  }
});
// editing user by id
app.put("/updateuser/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const updateuser = await Users.findByIdAndUpdate(id, data);
    if (updateuser) res.send(JSON.stringify(updateuser));
  } catch (err) {
    res.send(err);
  }
});
//del user by id
app.delete("/deleuser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleuser = await Users.findByIdAndDelete(id);
    if (deleuser) res.send(JSON.stringify(deleuser));
  } catch (err) {
    res.send(err);
  }
});

// creating express server
app.listen(5000, () => {
  console.log("port is 5000");
});
