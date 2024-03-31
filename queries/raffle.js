const { db } = require("../db/db-config");
//////////////////////////////////////////
const raffle_field_for_showing = ["id", "name", "create_at", "update_at", "status"];
const participant_for_showing = ['firstname', 'lastname', 'email', 'phone'];
//////////////////////////////////////////
const all_raffles = async () => {
  const raffles = await db.many(`SELECT ${raffle_field_for_showing.join(",")} FROM raffles;`);
  return raffles;
}

const create_raffle = async ({ name, secret_token }) => {
  const raffle = await db.oneOrNone(`INSERT INTO raffles 
  (name, secret_token) 
  VALUES($[name], $[secret_token])
  RETURNING name, secret_token;`, { name, secret_token });

  return raffle;
}

const raffle_by_id = async (id) => {
  const raffle = await db.oneOrNone(`SELECT ${raffle_field_for_showing.join(",")} FROM raffles WHERE id = $[id];`, { id });
  return raffle;
}

const add_participant_to_raffle = async ({ raffle_id, firstname, lastname, email, phone }) => {
  const signed_participant = await db.tx(async t => {
    const participant = await t.oneOrNone(`INSERT INTO participants 
    (firstname, lastname, email, phone)
    VALUES ($[firstname], $[lastname], $[email], $[phone])
    ON CONFLICT (email) DO NOTHING;
    SELECT * FROM participants WHERE email = $[email];`, { firstname, lastname, email, phone });

    let check_link = await t.oneOrNone(`SELECT * FROM participants_link_raffes 
    WHERE participant_id = $[participant_id] AND raffle_id = $[raffle_id];`, { participant_id: participant.id, raffle_id });

    if (!check_link) {
      check_link = await t.oneOrNone(`INSERT INTO participants_link_raffes (participant_id, raffle_id)
      SELECT $[participant_id], $[raffle_id]
      WHERE NOT EXISTS (
          SELECT 1 FROM participants_link_raffes
          WHERE participant_id = $[participant_id]
          AND raffle_id = $[raffle_id]
      )
      RETURNING *;`, { participant_id: participant.id, raffle_id });
    }

    if (!check_link || !participant.id) throw new Error("insert participant into raffle failed.");

    const participant_for_return = {};
    for (let key of participant_for_showing) participant_for_return[key] = participant[key];
    return participant_for_return;
  });
  return signed_participant;
}

const get_participants_by_raffle_id = async (raffle_id) => {
  const participants = await db.many(`SELECT ${participant_for_showing.join(",")} FROM participants_link_raffes 
  JOIN participants ON participants.id = participants_link_raffes.participant_id
  WHERE raffle_id = $[raffle_id]`, { raffle_id });
  return participants;
}


module.exports = {
  create_raffle,
  all_raffles,
  raffle_by_id,
  add_participant_to_raffle,
  get_participants_by_raffle_id
}