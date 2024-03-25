require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// 设置Express的trust proxy为true
app.set('trust proxy', false);
//middle ware//////////////////////////////////
app.use(cors({ credentials: true, origin: true }));
// app.use(express.static("./public"));
app.use(express.json({ type: "application/json", limit: "1m" }));

app.use((req, res, next) => {
  req.general_procedure = general_procedure;
  next();
})
//routes///////////////////////////////////////
//control
app.get('*', (req, res) => {
  res.status(404).send(error_code.code404());
})
///helper///////////////////////////////////////////
async function general_procedure(req, res, fn, error_callback) {
  try {
    await fn();
  } catch (error) {
    req.log_error(error);
    const message = error_code.message(error.message);
    const code = message !== error.message ? error.message : 500;
    res.status(Number(code)).json({ error: message });
    if (error_callback) error_callback();
  }
}
///export/////////////////////////////////////////////
module.exports = app;