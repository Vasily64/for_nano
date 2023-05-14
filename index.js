const express = require("express");
const mongoose = require("mongoose");
const { Users, Doctors } = require("./models/allModels");
const { bookingCheck } = require("./controllers/booking");
const timer = require("./timers");
require("dotenv-flow").config();

const PORT = 5005;
const URL_DB = process.env.CONNECT;
const app = express();
app.use(express.json());
app.listen(PORT, () => console.log(`Server working on ${PORT}`));

app.get("/", (req, res) => {
  res.status(200).json("Сервер запущен!");
});
app.post("/users/create", (req, res) => {
  const data = req.body;
  console.log(data, "data");
  const user = Users.create(req.body);
  res.status(200).json("okk");
});
app.post("/doctors/create", (req, res) => {
  const data = req.body;
  console.log(data, "data");
  const doctor = Doctors.create(req.body);
  res.status(200).json("doctor");
});
app.post("/bookings/create", bookingCheck);

async function startApplication() {
  try {
    await mongoose.connect(URL_DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (e) {
    console.log(e);
  }
}
startApplication();

timer;
