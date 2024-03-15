const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
const { AudioPlayerStatus ,createAudioPlayer, joinVoiceChannel, createAudioResource, StreamType } = require('@discordjs/voice');

const Stations = require('./stations.js');

//
const station_list = [];
Object.entries(Stations).forEach((ent) => {
    let val = ent[1];
    station_list.push(val);
})

function generateRadioTable(station_list){
    let message_content = "";
    for(let i = 0; i < station_list.length; i++){
       message_content += `${i + 1}. ${station_list[i].name} \n`;
    }

    return message_content;
}

console.log(generateRadioTable(station_list));

function play_radio(message, stations){

    const station_url = stations.url;
    const station_name = stations.name;

    const player = createAudioPlayer();
    const song = createAudioResource(station_url, {inputType: StreamType.Arbitrary });
    const channel = message.member.voice.channel;

    if(channel != null){
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator 
        })

        connection.on('stateChange', (oldState, newState) => {
            console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
        });

        player.on('stateChange', (oldState, newState) => {
            console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
        });

        connection.subscribe(player);
        player.play(song);

        message.reply(`Playing ${station_name}`);

    } else {
        message.reply('join voice first');
        return;
    }
}

module.exports = play_radio;
