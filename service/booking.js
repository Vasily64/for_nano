const { Bookings, Doctors, Notification } = require("../models/allModels");
const { ObjectId } = require("mongodb");
const moment = require("moment");

const BookingService = {
  async bookingCheck(data) {
    const doctors = await Doctors.find();
    const doctor = await Doctors.findOne({ _id: ObjectId(data.doctor_id) });
    const checkSlots = doctor.slots.filter((slot) => slot === data.slots);

    if (checkSlots.length === 1) {
      await Doctors.updateOne(
        { _id: doctor._id },
        { $pull: { slots: { $in: checkSlots } } }
      );
      data.hour = data.slots.substr(11, 2);
      data.start = moment(
        `${data.slots.slice(0, 10)} ${data.hour}:00`
      ).toDate();
      const bookingOne = await Bookings.create(data);
      await Notification.create({
        booking_id: bookingOne._id,
        user_id: data.user_id,
        doctor_id: data.doctor_id,
      });
      return bookingOne;
    }
    throw new Error(
      "Нет возможности забронировать слот, выберите другой, пожалуйста",
      500
    );
  },
};

module.exports = BookingService;
