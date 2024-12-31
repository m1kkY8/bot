const play = require("play-dl");
const { is_queue_empty, push_queue, shift_queue } = require("../util/queue.js");
const { get_yt_song } = require("../util/get_youtube_song.js");
const {
  joinVoiceChannel,
  createAudioResource,
  AudioPlayerStatus,
} = require("@discordjs/voice");

const player = require("../util/player.js");

let is_playing = false;
let connection;
let subscription;
let currently_playing;

player.on(AudioPlayerStatus.Idle, () => {
  play_song();
  return;
});

function terminate() {
  subscription.unsubscribe();
  subscription = null;
  is_playing = false;
  connection.destroy();
  return;
}

function now_playing(message) {
  message.reply(currently_playing);
}

function get_connection(message) {
  const channel = message.member.voice.channel;
  if (!channel) {
    message.reply("udji u vojs debilu");
    return;
  } else {
    return (connection = joinVoiceChannel({
      channelId: message.member.voice.channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    }));
  }
}

async function play_song() {
  if (!is_queue_empty()) {
    const { url, title } = shift_queue();
    const stream = await play.stream(url);

    currently_playing = title;
    const audio_resource = createAudioResource(stream.stream, {
      inputType: stream.type,
    });

    player.play(audio_resource);
    subscription = connection.subscribe(player);

    is_playing = true;
  } else {
    player.stop();
    return;
  }
}

async function handle_song(message) {
  connection = get_connection(message);
  const args = message.content.split(" ").slice(1);
  const arg = args[0];

  if (args.length === 0) {
    if (is_queue_empty()) {
      message.reply(`ne znam sta da radim majmune`);
      return;
    } else {
      play_song();
      return;
    }
  }

  if (arg) {
    if (arg === "np") {
      now_playing(message);
      return;
    } else if (arg === "pause") {
      player.pause();
      return;
    } else if (arg === "skip") {
      play_song();
      return;
    } else if (arg === "resume") {
      player.unpause();
      return;
    } else if (arg === "stop") {
      terminate();
      return;
    } else {
      const info = await get_yt_song(arg);
      push_queue(info);
      if (!is_playing) {
        play_song();
        message.reply(info.title);
        return;
      }
    }
  }
}

module.exports = {
  command: handle_song,
  command_name: "play",
};
