const { createAudioPlayer, joinVoiceChannel, createAudioResource, StreamType, NoSubscriberBehavior } = require('@discordjs/voice');
const play = require('play-dl');
const fs = require('node:fs');

async function play_radio(message){
    
    const args = message.content.split(' ');
    const link = args[1]; 

    if (!link){
        message.reply('link majmune');
        return;
    }

    const player = createAudioPlayer({
        behaviors: NoSubscriberBehavior.Pause
    });
    
    const stream = await play.stream(link);
    const song = createAudioResource(stream.stream, {inputType: stream.type});
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

    message.reply(`Svira`);
}

module.exports = {
    command_name: 'play',
    command: play_radio 
}
