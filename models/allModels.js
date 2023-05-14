const mongoose = require("mongoose");

module.exports = {
  Users: mongoose.model("Users", require("./users"), "Users"),
  Doctors: mongoose.model("Doctors", require("./doctors"), "Doctors"),
  Bookings: mongoose.model("Bookings", require("./bookings"), "Bookings"),
  Notification: mongoose.model(
    "Notification",
    require("./notification"),
    "Notification"
  ),
};
