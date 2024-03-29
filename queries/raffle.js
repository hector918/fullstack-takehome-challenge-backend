const { db } = require("../db/db-config");
//////////////////////////////////////////
const raffle_field_for_showing = ["id", "name", "create_at", "update_at", "status"];
//////////////////////////////////////////
const all_raffles = async () => {
  const raffles = await db.many(`SELECT ${raffle_field_for_showing.join(",")} FROM raffles;`);
  return raffles;
}

const create_raffle = async ({ name, secret_token }) => {
  const raffle = await db.oneOrNone(`INSERT INTO raffles 
  (name, secret_token) 
  VALUES($[name], $[secret_token])
  RETURNING *;`, { name, secret_token });

  return raffle;
}

const raffle_by_id = async (id) => {
  const raffle = await db.oneOrNone(`SELECT ${raffle_field_for_showing.join(",")} FROM raffles WHERE id = $[id];`, { id });
  return raffle;
}

module.exports = { create_raffle, all_raffles, raffle_by_id }