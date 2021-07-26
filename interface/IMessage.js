class Message {
  constructor({ name: name, origin: origin, destination: destination }) {
    if (name === undefined || origin === undefined || destination === undefined)
      throw new Error("INVALID_MESSAGE");
    this.name = name;
    this.origin = origin;
    this.destination = destination;
  }
}
module.exports = {
  Message,
};
