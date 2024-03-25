const app = require("./app.js");
const http = require('http');
const https = require('https');
const fs = require('fs');
require("dotenv").config();
const { HTTPS_PORT, HTTP_PORT } = process.env;
const options = {
  key: fs.readFileSync('./ssl/localhost-key.pem'),
  cert: fs.readFileSync('./ssl/localhost-cert.pem')
};
const http_on = false;
// LISTEN
try {
  const https_server = https.createServer(options, app).listen(HTTPS_PORT || 8000, "0.0.0.0", () => {
    console.log(`Https Listening on port ${HTTPS_PORT || 8000}`);
  });
  const http_server = http_on ? http.createServer(app).listen(HTTP_PORT || 8001, () => {
    console.log(`Http Listening on port ${HTTP_PORT || 8001}`)
  }) : null;

  https_server.on('clientError', handle_client_error);
  if (http_on) http_server.on('clientError', handle_client_error);
} catch (error) {
  console.error(error);
}

function handle_client_error(error, socket) {
  console.error('clientError:', error);
  socket.destroy();  // This will destroy the socket
}