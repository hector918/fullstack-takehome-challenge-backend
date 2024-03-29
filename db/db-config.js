const pgp = require("pg-promise")();
require("dotenv").config();

try {
  const db = pgp(process.env.DB_URL);

  db.connect()
    .then(obj => {
      // Can check the server version here (pg-promise v10.1.0+):
      const serverVersion = obj.client.serverVersion;

      obj.done(); // success, release the connection;
    })
    .catch(error => {
      console.log('ERROR:', error.message || error);
    });
} catch (error) {

}