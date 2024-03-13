const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
const { AudioPlayerStatus ,createAudioPlayer, joinVoiceChannel, createAudioResource, StreamType } = require('@discordjs/voice');

function play_song(message){

    const player = createAudioPlayer();
    const song = createAudioResource(`/home/tox/Music/Miley Cyrus and Billy Idol - Rebel Yell (Live iHeartRadio Music Festival 2016).mp3`);
    const channel = message.member.voice.channel;

    if(channel != null){
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator 
        })

        player.play(song);
        connection.subscribe(player);

        message.reply('Songs');

    } else {
        message.reply('join voice first');
        return;
    }
}

module.exports = play_song;
