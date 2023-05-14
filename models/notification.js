const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const NotificationSchema = new Schema({
  booking_id: { required: true, type: Schema.Types.ObjectId, ref: "Bookings" },
  user_id: { required: true, type: Schema.Types.ObjectId, ref: "Users" },
  doctor_id: { required: true, type: Schema.Types.ObjectId, ref: "Doctors" },
  is_send_before_one_day: { type: Boolean, default: false },
  is_send_before_two_hour: { type: Boolean, default: false },
});
module.exports = NotificationSchema;
