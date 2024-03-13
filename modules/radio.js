const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
const { AudioPlayerStatus ,createAudioPlayer, joinVoiceChannel, createAudioResource, StreamType } = require('@discordjs/voice');
const STATIONS = require('./stations.js');

function play_radio(message){
    const url = STATIONS.PakaoRadio;
    const player = createAudioPlayer();
    const song = createAudioResource(url, {inputType: StreamType.Arbitrary });
    const channel = message.member.voice.channel;

    if(channel != null){
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator 
        })

        connection.subscribe(player);
        player.play(song);

        message.reply('Play radio');

    } else {
        message.reply('join voice first');
        return;
    }
}

module.exports = play_radio;
