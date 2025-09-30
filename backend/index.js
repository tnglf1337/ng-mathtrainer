const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const UebungEvent = require("./schema.js");

mongoose.connect("mongodb://localhost:27017/uebungEventDb")
  .then(() => console.log("MongoDB verbunden"))
  .catch(err => console.error(err));

app.listen(11000, () => {
 console.log("started server on port 11000");
})

app.post('/uebung-event', async (req, res) => {
  const neuesUebungEvent = new UebungEvent(req.body);
  await neuesUebungEvent.save();
  console.log("UebungEvent created: ", neuesUebungEvent);
})
