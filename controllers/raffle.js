const express = require("express");
const raffle = express.Router();
const { create_raffle } = require('../queries/raffle');
const { validate_raffle } = require('../validation_');

raffle.get('/', async (req, res) => {
  await req.general_procedure(req, res, async () => {
    //list all raffles
    res.json({ data: "" })
  })
})

raffle.post('/', validate_raffle, async (req, res) => {
  const { name } = req.vaildBody;
  await req.general_procedure(req, res, async () => {
    //create a raffles
    const raffle = await create_raffle({ name, secret_token: create_secret_token() });
    if (!raffle) throw new Error("create raffle error.");
    res.json({ data: raffle })
  })
  ////////////////////////////////////////////////
  function create_secret_token(length = 6) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
})


module.exports = raffle;