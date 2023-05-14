const mongoose = require("mongoose");
const { Schema } = require("mongoose");
// Date_Time: первые 4 цифры год, далее месяц из 2 цифр если это месяц с 1 по 9 - пишем через 0(пример 01-месяц январь), та же логика с другими числами в дате
// Пример 2023-01-01;10-12
const Date_Time = { type: String, validate: /^\d{4}-\d{2}-\d{2};\d{2}-\d{2}$/ };
const DoctorsSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String },
  spec: { type: String, required: true },
  slots: [Date_Time],
});
module.exports = DoctorsSchema;
