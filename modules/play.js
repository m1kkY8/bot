const { createAudioPlayer, joinVoiceChannel, createAudioResource, StreamType, NoSubscriberBehavior } = require('@discordjs/voice');
const play = require('synthara-streams');

async function play_youtube(message){
    
    const args = message.content.split(' ');
    //const link = args[1]; 
    const link = 'https://www.youtube.com/watch?v=UuLCwPh2bVs'; 

    if (!link){
        message.reply('link majmune');
        return;
    }

    const player = createAudioPlayer({
        behaviors: NoSubscriberBehavior.Pause
    });
    
    const video_info = await play.video_info(link);
    const stream = await play.stream(link);

    const song = {
        title: video_info.video_details.title,
        duration: video_info.video_details.durationInSec
    }

    const audio_resource = createAudioResource(stream.stream, {inputType: stream.type});
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
    player.play(audio_resource);

    message.reply(`${song.title}`);
}

module.exports = {
    command_name: 'play',
    command: play_youtube 
}
