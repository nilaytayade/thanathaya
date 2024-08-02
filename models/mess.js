const mongoose = require("mongoose");
const { Schema } = mongoose;

const messSchema = new Schema({
  name: { type: String, unique: true, required: true },
  contact: { type: String, required: true },
  location: { type: String, required: true },
  mess_photo: { type: String },
  price: { type: Number, required: true },
  menu_photo: { type: Schema.Types.Mixed },
  created_at: { type: Date, default: Date.now },
  last_updated: { type: Date, default: Date.now },
});

// Update 'last_updated' field on save
messSchema.pre("save", function (next) {
  this.last_updated = Date.now();
  next();
});

const Mess = mongoose.model("Mess", messSchema);

module.exports = Mess;
