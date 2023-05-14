const BookingService = require("../service/booking");

const BookingController = {
  async bookingCheck(req, res) {
    const booking = await BookingService.bookingCheck(req.body);
    res.status(201).json(booking);
  },
};
module.exports = BookingController;
