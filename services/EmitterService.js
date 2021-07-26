const EventEmitter = require("events");
const {
  MessageEncodingDecodingUtil,
} = require("../utils/MessageEncodingDecodingUtil");
const { MessageFactory } = require("./MessageFactory");
class EmitterService extends EventEmitter{
  constructor() {
    super();
  }
    generateMessageStream( count, source) {
    let messageQueue = [];
    let messageObj = new MessageFactory({ source: source });
    for (let i = 0; i < count; i++) {
      let message = messageObj._message;
      let checksum = MessageEncodingDecodingUtil.generateSignature(message);
      message.secret_key = checksum;
      let encryptMessage = MessageEncodingDecodingUtil.encrypt(message);
      messageQueue.push(encryptMessage.content);
    }
    let message = messageQueue.join('|');
    this.emit("data",message);
    return message
  }
}



module.exports = { EmitterService };
