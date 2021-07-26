const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const config = require("./config/config");
const dataSource = require("./data.json");
const http = require("http").createServer();
http.listen(parseInt(config.app.EMITTER_SERVICE_PORT), () => {
  console.log("Server Is Running Port: " + config.app.EMITTER_SERVICE_PORT);
});
