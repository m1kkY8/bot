const { createAudioPlayer, joinVoiceChannel, createAudioResource, StreamType, NoSubscriberBehavior } = require('@discordjs/voice');

const ytdl = require('ytdl-core-discord');
const url = "https://www.youtlbe.com/watch?v=MF8RFD7tk48";

function play_radio(message){


    const player = createAudioPlayer({
        behaviors: NoSubscriberBehavior.Play
    });

    const stream = ytdl(url, {filter: 'audioonly'}) ;
    const song = createAudioResource(stream, {inputType: StreamType.Arbitrary });
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
        message.reply(`nisi u vojsu majmune`);
        return;
    }
}

function amogus(message, client){
    play_radio(message);
}

module.exports = amogus;
