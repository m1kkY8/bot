const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
const { 
    createAudioPlayer, 
    joinVoiceChannel, 
    createAudioResource, 
    StreamType, 
    NoSubscriberBehavior } = require('@discordjs/voice');

function play_radio(message, stations){

    const station_url = stations.url;
    const station_name = stations.name;

    const player = createAudioPlayer({
        behaviors: NoSubscriberBehavior.Play
    });

    const song = createAudioResource(station_url, {inputType: StreamType.Arbitrary });
    const channel = message.member.voice.channel;

    if(channel != null){
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator 
        })

        connection.subscribe(player);
        player.play(song);

        message.reply(`Playing ${station_name}`);

    } else {
        message.reply('join voice first');
        return;
    }
}

module.exports = play_radio;
