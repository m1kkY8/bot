const axios = require('axios');
const cheerio = require('cheerio');

function get_song_info(message, station) {

    const { info } = station; 

    axios.get(info)
        .then(response => {
            const data = response.data.rs;

            const $ = cheerio.load(data);
            $('.details p i').remove();
            const currentSongDetails = $('.details p').text();
            const [artist, songName] = currentSongDetails.split(' - ');

            message.reply(`${artist.trim()} - ${songName.trim()}`);
        })
        .catch(error => {
            console.error('Uhvatili smo kurac zbog:', error);
        });
}

module.exports = {
    get_song_info
}
