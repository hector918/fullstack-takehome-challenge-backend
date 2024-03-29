const { db } = require("../db/db-config");



const create_raffle = async ({ name, secret_token }) => {


  const raffle = db.oneOrNone(`INSERT INTO raffles 
  (name, secret_token) 
  VALUES($[name], $[secret_token])
  RETURNING *;`, { name, secret_token });

  return raffle;
}


module.exports = { create_raffle }