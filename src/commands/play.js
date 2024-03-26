const play = require('play-dl');
const { get_len, push_queue, shift_queue, get_table, now_playing} = require('../util/queue.js');
const { 
    createAudioPlayer,
    joinVoiceChannel,
    createAudioResource,
    AudioPlayerStatus,
} = require('@discordjs/voice');


const player = createAudioPlayer();
let is_playing = false; 
let connection;
let subscription;

player.on(AudioPlayerStatus.Idle, () => {
    if(get_len() === 0){
        subscription.unsubscribe();
        subscription = null;
        is_playing = false;
        connection.destroy();
    }
    play_song();
    return;
});


function get_connection(message){
    const channel = message.member.voice.channel;
    if(!channel){
        message.reply('udji u vojs debilu');
        return;
    } else {
        return connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });
    }
}

async function play_song(){
    if (get_len()){

        const url = shift_queue(); 
        const stream = await play.stream(url);
        const audio_resource = createAudioResource(stream.stream, {inputType: stream.type});
        
        player.play(audio_resource);
        subscription = connection.subscribe(player);

        is_playing = true;
    }
}

function handle_song(message){
    connection = get_connection(message);
    const arg = message.content.split(' ')[1];
    if(!arg){
        message.reply(`link majmune`);
        return;
    }

    if (arg === 'np'){
        now_playing(message); 
        return;
    } else if (arg === 'q'){
        get_table(message);
        return;
    } else if (arg === 'pause'){
        player.pause();
        return;
    } else if (arg === 'resume'){
        player.unpause();
        return;
    } else if (arg === 'stop'){
        player.stop();
        subscription.unsubscribe();
        subscription = null;
        is_playing = false;
        connection.destroy(); 
        return;
    }else { 
        push_queue(arg);
        if(!is_playing){
            play_song(message);
            return;
        }
    }
}

module.exports = {
        command: handle_song,
        command_name: "yt"
}
