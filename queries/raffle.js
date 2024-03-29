const { db } = require("../db/db-config");

const all_raffles = async () => {
  const raffles = await db.many(`SELECT id, name, create_at, update_at, status FROM raffles;`);
  return raffles;
}

const create_raffle = async ({ name, secret_token }) => {
  const raffle = await db.oneOrNone(`INSERT INTO raffles 
  (name, secret_token) 
  VALUES($[name], $[secret_token])
  RETURNING *;`, { name, secret_token });

  return raffle;
}

module.exports = { create_raffle, all_raffles }