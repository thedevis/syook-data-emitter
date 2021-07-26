const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const config = require("./config/config");
const cluster = require("cluster");
const os = require("os");
if (cluster.isMaster) {
  for (var i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
  cluster.on("exit", function (worker) {
    cluster.fork();
  });
} else {
  const { EmitterService } = require("./services/EmitterService");
  const dataSource = require("./data.json");
  const http = require("http").createServer();
  const io = require("socket.io")(http);
  let emitterServiceObj = new EmitterService();
  setInterval(() => {
    let randomMessageCount = Math.floor(
      Math.random() *
        (parseInt(config.app.MESSAGE_MAX_COUNT) -
          parseInt(config.app.MESSAGE_MIN_COUNT) +
          1) +
        parseInt(config.app.MESSAGE_MIN_COUNT)
    );
    let _messagePacket = emitterServiceObj.generateMessageStream(
      randomMessageCount,
      dataSource
    );
  }, 1000 * parseInt(config.app.EMITTER_SERVICE_INTERVAL));

  io.on("connection", (socket) => {
    console.log(`New client connected`);
    emitterServiceObj.on("data", (data) => {
      console.log(`Sending data to client....`);
      socket.emit("message", data);
    });
  });
  io.on("exit", () => {
    console.log("client disconnected");
  });

  http.listen(parseInt(config.app.EMITTER_SERVICE_PORT), () => {
    console.log("Server Is Running Port: " + config.app.EMITTER_SERVICE_PORT);
  });
}
