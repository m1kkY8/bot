function clear(message) {
  if (message.channel.type === "dm") {
    message.channel.send("You cannot clear messages in a DM");
    return;
  }

  message.channel.messages
    .fetch({ limit: 100 })
    .then((msg) => message.channel.bulkDelete(msg));
}

module.exports = {
  command_name: "clear",
  command: clear,
};
