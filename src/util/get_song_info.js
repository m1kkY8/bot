const axios = require('axios');
const cheerio = require('cheerio');
const play = require('play-dl');

function get_radio_song(message, station) {

    const {name, info } = station; 

    axios.get(info)
        .then(response => {
            const data = response.data.rs;

            const $ = cheerio.load(data);
            $('.details p i').remove();
            const currentSongDetails = $('.details p').text();
            const [artist, songName] = currentSongDetails.split(' - ');

            message.reply(`${name}: ${artist.trim()} - ${songName.trim()}`);
        })
        .catch(error => {
            console.error('Uhvatili smo kurac zbog:', error);
        });
}

async function get_yt_song(url){
    const info = await play.video_info(url);
    return {
        url: url,
        title: info.video_details.title
    };
}

module.exports = {
    get_radio_song,
    get_yt_song
}
