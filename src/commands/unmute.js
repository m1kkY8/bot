function unmute_self(message) {
  message.guild.members.me.voice.setMute(false);
}

module.exports = {
  command: unmute_self,
  command_name: "unmute",
};
