const { createAudioPlayer, joinVoiceChannel, createAudioResource, StreamType, NoSubscriberBehavior } = require('@discordjs/voice');
const play = require('play-dl');

play.setToken({
    useragent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
})

async function play_youtube(message){
    
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
