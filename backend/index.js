const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const UebungEvent = require("./schema.js");

// mongodb://localhost:27017/uebungEventDb -> DEV
// mongodb://host.docker.internal:27017/uebungEventDb -> PROD

mongoose.connect("mongodb://localhost:27017/uebungEventDb")
  .then(() => console.log("MongoDB verbunden"))
  .catch(err => console.error(err));

app.listen(11000, () => {
 console.log("started server on port 11000");
})

app.get('/find-events-by-username/:username', async (req, res) => {
  const username = req.params.username;
  const events = await UebungEvent.find({ username: username });
  res.json(events);
})

app.post('/uebung-event', async (req, res) => {
  const neuesUebungEvent = new UebungEvent(req.body);
  await neuesUebungEvent.save();
  console.log("UebungEvent created: ", neuesUebungEvent);
})
