const play = require("play-dl");

async function get_yt_song(url) {
  const info = await play.video_info(url);
  return {
    url: url,
    title: info.video_details.title,
  };
}

module.exports = {
  get_yt_song,
};
