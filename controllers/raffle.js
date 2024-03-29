const express = require("express");
const raffle = express.Router();
const { test } = require('../queries/raffle');


raffle.get('/', async (req, res) => {
  await req.general_procedure(req, res, async () => {
    //list all raffles

  })
})

raffle.post('/', async (req, res) => {
  const { name } = req.body;
  console.log(name);
  await req.general_procedure(req, res, async () => {
    //create a raffles

  })
})


module.exports = raffle;