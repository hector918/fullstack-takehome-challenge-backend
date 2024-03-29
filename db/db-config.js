const pgp = require("pg-promise")();
require("dotenv").config();

try {
  var db = pgp(process.env.DB_URL);

  db.connect()
    .then(obj => {
      // Can check the server version here (pg-promise v10.1.0+):
      const serverVersion = obj.client.serverVersion;
      console.log(serverVersion);
      if (db) db.oneOrNone("SET TIME ZONE 'US/Eastern';SELECT current_setting('TIMEZONE') AS current_timezone;").then(res => console.log("database timezone", res));

      obj.done(); // success, release the connection;
    })
    .catch(error => {
      console.log('ERROR:', error.message || error);
    });
} catch (error) {

}
module.exports = { db }

