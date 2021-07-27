const dataSource = require('./data.json');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const config = require('./config/config');
const { EmitterService } = require('./services/EmitterService');
const { read } = require('fs');
const app = require('express')()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
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
  console.log(
    `Generated ${randomMessageCount} encrypted messages.....${randomMessageCount}`
  );
}, 1000 * parseInt(config.app.EMITTER_SERVICE_INTERVAL));

io.on('exit', () => {
  console.log('client disconnected');
});
io.on('connection', (socket) => {
  console.log(`New client connected`);
  emitterServiceObj.on('data', (data) => {
    socket.emit('message', data);
  });
});
app.get('/ping',(req,res)=>{
  res.json({status:1,message:"emitter service is up..."})
})
http.listen(parseInt(config.app.EMITTER_SERVICE_PORT), () => {
  console.log('Server Is Running Port: ' + config.app.EMITTER_SERVICE_PORT);
});
