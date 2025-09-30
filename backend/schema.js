const mongoose = require("mongoose");

const UebungEventSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  beendetAm: { type: String },
  username: { type: String, required: true },
  modus: { type: String, enum: ["add", "sub", "mul", "div", "mixed"] },
  schwierigkeit: { type: String, enum: ["0", "1", "2"] },
  korrektLoesungen: { type: Number, default: 0 },
  falscheLoesungen: { type: Number, default: 0 }
})

const UebungEvent = mongoose.model("UebungEvent", UebungEventSchema);

module.exports = UebungEvent;
