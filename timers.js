const cron = require("node-cron");
const moment = require("moment");
const { Bookings, Notification } = require("./models/allModels");
const Promise = require("bluebird");
const fs = require("fs");
const { log } = require("console");

module.exports = cron.schedule("* * * * *", async () => {
  const currentDay = new Date();

  const nextDay = moment(currentDay).add(1, "day");
  const dayAfter = currentDay.toISOString().slice(0, 10);
  const checkSlot = await Bookings.find({
    start: { $lte: nextDay, $gt: currentDay },
  });
  constIdBookings = checkSlot.map((one) => one._id);
  if (checkSlot) {
    const notificationNeed = await Notification.find({
      booking_id: { $in: constIdBookings },
    })
      .populate("user_id", "name")
      .populate("doctor_id", "spec")
      .populate("booking_id", "slots start hour");
    const notificationNeedBeforeOneDay = notificationNeed.filter(
      (one) => one.is_send_before_one_day === false
    );
    const notificationNeedBeforeTwoHour = notificationNeed.filter(
      (one) => one.is_send_before_two_hour === false
    );
    const beforeTwoHour = notificationNeedBeforeTwoHour.filter((one) => {
      const addTwoHour = moment(currentDay).add(2, "h");
      const oneMinutesBefore = moment(currentDay).subtract(1, "m");
      return (
        moment(one.booking_id.start).isBefore(addTwoHour) &&
        moment(one.booking_id.start).isAfter(oneMinutesBefore)
      );
    });
    if (notificationNeedBeforeOneDay.length >= 1) {
      Promise.map(notificationNeedBeforeOneDay, async (one) => {
        let textToLog = `{${currentDay}| Привет ${one.user_id.name}}! {Напоминаем что вы записаны к ${one.doctor_id.spec}y завтра в ${one.booking_id.slots}}`;
        let fileContent = fs.readFileSync(
          ".log",
          "utf8",
          function (error, fileContent) {
            if (error) throw error;
          }
        );

        let toWrite = `${fileContent}\n${textToLog}`;
        fs.writeFileSync(".log", toWrite, function (error) {
          if (error) throw error;
          console.log("Данные успешно записаны записать файл");
        });

        try {
          await Notification.findOneAndUpdate(
            { _id: one._id },
            { is_send_before_one_day: true }
          );
        } catch (e) {
          console.log(e.message);
        }
      });
    }
    if (beforeTwoHour.length >= 1) {
      Promise.map(notificationNeedBeforeTwoHour, async (one) => {
        let textToLog = `{${currentDay}| Привет ${one.user_id.name}}! {Вам через 2 часа к ${one.doctor_id.spec}у в ${one.booking_id.hour}}`;
        let fileContent = fs.readFileSync(
          ".log",
          "utf8",
          function (error, fileContent) {
            if (error) throw error;
          }
        );

        let toWrite = `${fileContent}\n${textToLog}`;
        fs.writeFileSync(".log", toWrite, function (error) {
          if (error) throw error;
        });
        try {
          await Notification.findOneAndUpdate(
            { _id: one._id },
            { is_send_before_two_hour: true }
          );
        } catch (e) {
          console.log(e.message);
        }
      });
    }
  }
});
