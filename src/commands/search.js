const play = require("play-dl");
const { push_queue } = require("../util/queue.js");

async function search_song(message) {
  const args = message.content.toLowerCase().split(" ").slice(1).join(" ");

  const yt_info = await play.search(args, { limit: 1 });
  const url = yt_info[0].url;
  const title = yt_info[0].title;

  if (url) {
    message.reply(title);
    push_queue({ url: url, title: title });
    return;
  }

  message.reply("nema");
  return;
}

module.exports = {
  command: search_song,
  command_name: "search",
};
