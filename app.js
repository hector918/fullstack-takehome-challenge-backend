require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// 设置Express的trust proxy为true
app.set('trust proxy', false);
//middle ware//////////////////////////////////
app.use(cors({ credentials: true, origin: true }));
// app.use(express.static("./public"));
app.use(express.json({ type: "application/json", limit: "1kb" }));

app.use((req, res, next) => {
  req.general_procedure = general_procedure;
  next();
})
//routes///////////////////////////////////////
app.use('/api/raffles', require('./controllers/raffle'));
//control
app.get('/', (req, res) => {
  res.status(200).json({ data: "server is running." });
})
app.get('*', (req, res) => {
  res.status(404).json({ error: "page not found." });
})
///helper///////////////////////////////////////////
async function general_procedure(req, res, fn, error_callback) {
  try {
    await fn();
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: error.message });
    if (error_callback) error_callback();
  }
}
///export/////////////////////////////////////////////
module.exports = app;