const player = require("../util/player.js");
const {
  joinVoiceChannel,
  createAudioResource,
  StreamType,
} = require("@discordjs/voice");

function persona(message) {
  const url = "/home/tox/Music/Persona 5 - Beneath the Mask.mp3";

  const song = createAudioResource(url, { inputType: StreamType.Arbitrary });
  const channel = message.member.voice.channel;

  if (!channel) {
    message.reply(`nisi u vojsu majmune`);
    return;
  }

  connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: message.guild.id,
    adapterCreator: message.guild.voiceAdapterCreator,
  });

  subscription = connection.subscribe(player);
  player.play(song);
}

module.exports = {
  command: persona,
  command_name: "persona",
};
