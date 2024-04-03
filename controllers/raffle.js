const express = require("express");
const raffle = express.Router();
const {
  create_raffle,
  all_raffles,
  raffle_by_id,
  add_participant_to_raffle,
  get_participants_by_raffle_id,
  pick_a_winner,
  get_raffle_winner_info
} = require('../queries/raffle');
const {
  validate_raffle,
  validate_id,
  validata_participant,
  validate_token
} = require('../validation_');

raffle.get('/', async (req, res) => {
  await req.general_procedure(req, res, async () => {
    //list all raffles
    const raffles = await all_raffles();
    res.json({ data: raffles });
  })
})

raffle.get('/:id', validate_id, async (req, res) => {
  const { id } = req.vaildParams;
  await req.general_procedure(req, res, async () => {
    //list all raffles
    const raffle = await raffle_by_id(id);
    if (!raffle) throw new Error("raffle id not found.");
    res.json({ data: raffle });
  })
})

raffle.post('/', validate_raffle, async (req, res) => {
  const { name, secret_token } = req.vaildBody;

  await req.general_procedure(req, res, async () => {
    //create a raffles
    const raffle = await create_raffle({ name, secret_token });
    if (!raffle) throw new Error("create raffle error.");
    res.json({ data: raffle });
  })

})

raffle.post('/:id/participants', validate_id, validata_participant, async (req, res) => {
  const { id } = req.vaildParams;
  await req.general_procedure(req, res, async () => {
    //Sign up a participant for a raffle
    const participant = await add_participant_to_raffle({ raffle_id: id, ...req.vaildBody });
    if (!participant) throw new Error("participant id not found.");
    res.json({ data: participant });
  })
})

raffle.get('/:id/participants', validate_id, async (req, res) => {
  const { id } = req.vaildParams;
  await req.general_procedure(req, res, async () => {
    const participants = await get_participants_by_raffle_id(id);
    res.json({ data: participants });
  })
})


raffle.put('/:id/winner', validate_id, validate_token, async (req, res) => {
  const { id } = req.vaildParams;
  const { secret_token } = req.vaildBody;
  await req.general_procedure(req, res, async () => {
    const ret = await pick_a_winner(id, secret_token);
    res.json({ data: ret });
  })
})

raffle.get('/:id/winner', validate_id, async (req, res) => {
  const { id } = req.vaildParams;

  await req.general_procedure(req, res, async () => {
    const winner = await get_raffle_winner_info(id);
    if (!winner || winner.length === 0) throw new Error(`Can find winnder for raffle ${id}.`);
    res.json({ data: winner });
  })
})

module.exports = raffle;