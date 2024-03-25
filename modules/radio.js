const axios = require('axios');
const cheerio = require('cheerio');
const { generate_radio_table, generate_list } = require('./stations.js');

const { EmbedBuilder } = require('discord.js');
const { createAudioPlayer, joinVoiceChannel, createAudioResource, StreamType, NoSubscriberBehavior } = require('@discordjs/voice');

let current_station = 0;
const stations = generate_list();

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

function play_radio(message, station){

    let { url, name} = station

    const player = createAudioPlayer({
        behaviors: NoSubscriberBehavior.Play
    });

    const song = createAudioResource(url, {inputType: StreamType.Arbitrary });
    const channel = message.member.voice.channel;

    if(!channel){
        message.reply(`nisi u vojsu majmune`);
        return;
    }

    const connection = joinVoiceChannel({
        channelId: channel.id, 
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator });

    connection.subscribe(player);
    player.play(song);

    message.reply(`Svira ${name}`);
}

function handle_radio(message){
    const command = message.content.toLowerCase().split(" ");

    if(command[1] === 'np'){
        get_song_info(message, stations[current_station]);
        return;
    }

    if(command[1]){

        current_station = parseInt(command[1]) - 1;

        if(isNaN(current_station) || current_station > stations.length - 1){
            message.reply('jebem te ustima');
            return;
        }

        stations[current_station].now_playing = true;
        play_radio(message, stations[current_station]);

    } else {
        const radio_table = generate_radio_table(stations);
        const embed = new EmbedBuilder()
        .setColor(0x800080)
        .setTitle('Radio')
        .addFields( { name: 'Dostupne Stanice', value: radio_table })
        .setTimestamp();

        message.reply({embeds: [embed] });
    }
}

module.exports = {
    command_name: 'radio',
    command: handle_radio
}
