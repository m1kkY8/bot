const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

function SongInfo_handler(message) {

    axios.get('https://www.naxi.rs/stations/rs-cafe.json')
        .then(response => {
            const data = response.data.rs;

            // Extract the artist and song name using cheerio
            const $ = cheerio.load(data);
            $('.details p i').remove();
            const currentSongDetails = $('.details p').text();
            console.log("Current Song Details:", currentSongDetails);
            const [artist, songName] = currentSongDetails.split(' - ');
                
            message.reply(`${artist.trim()} - ${songName.trim()}`);
        })
        .catch(error => {
            console.error('Uhvatili smo kurac zbog:', error);
        });
}

module.exports = {
    command_name: 'getsong',
    command: SongInfo_handler
}

