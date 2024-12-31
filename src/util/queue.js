const play = require("play-dl");
const queue = [];

function is_queue_empty() {
  return queue.length === 0;
}

function shift_queue() {
  return queue.shift();
}

async function push_queue(info) {
  queue.push(info);
}

function get_queue() {
  return queue;
}

async function get_table(message) {
  if (queue.length === 0) {
    message.reply("Nema vise");
    return;
  }

  let content = "";
  let index = 1;
  for (const song of queue) {
    const info = await play.video_basic_info(song);
    content += `${index++}. ${info.video_details.title} \n`;
  }

  message.reply(content);
}

async function now_playing(message) {
  const url = queue[0];
  const info = await play.video_basic_info(url);
  message.reply(`${info.video_details.title}`);
}

function get_queue_length() {
  return queue.length;
}

module.exports = {
  shift_queue,
  push_queue,
  get_table,
  now_playing,
  get_queue_length,
  is_queue_empty,
  get_queue,
};
