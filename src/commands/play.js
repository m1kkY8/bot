const play = require('play-dl');
const { get_len, push_queue, shift_queue, get_table, print_queue } = require('../util/queue.js');
const { createAudioPlayer, joinVoiceChannel, createAudioResource, AudioPlayerStatus, } = require('@discordjs/voice');

const player = createAudioPlayer();
let is_playing = false; 
let connection;
let subscription;
let currently_playing;

player.on(AudioPlayerStatus.Idle, () => {
    if(get_len() === 0){
        setTimeout(() => terminate(), 2000);
        terminate;
    }
    play_song();
    return;
});

function terminate(){
    subscription.unsubscribe();
    subscription = null;
    is_playing = false;
    connection.destroy();
    return; 
}

function now_playing(message){
    message.reply(currently_playing);
}

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

async function search_song(query, message){
    const yt_info = await play.search(query, {limit: 1});
    const url = yt_info[0].url;
    const title = yt_info[0].title;
    message.reply(title);

    return url;
}

async function play_song(){
    print_queue();
    if (get_len()){

        const url = shift_queue();
        console.log(url);
        const yt_info = await play.video_info(url); 
        const stream = await play.stream(url);
        
        currently_playing = yt_info.video_details.title;
        const audio_resource = createAudioResource(stream.stream, {inputType: stream.type});

        player.play(audio_resource);
        subscription = connection.subscribe(player);

        is_playing = true;
    }
}

async function handle_song(message){
    connection = get_connection(message);
    const args = message.content.split(' ').slice(1);
    const arg = args[0];

    if(!args){
        message.reply(`ne znam sta da radim majmune`);
        return;
    }

    if (arg === 'np'){
        now_playing(message); 
        return;
    } else if (arg === 'q'){
        const table = await get_table();
        message.reply(`${table}`);
        return;
    } else if (arg === 'pause'){
        player.pause();
        return;
    } else if (arg === 'resume'){
        player.unpause();
        return;
    } else if (arg === 'stop'){
        terminate();
        return;
    } else { 
        if(!is_playing){
            play_song(message);
            return;
        }

        push_queue(arg);
        return;
    }
}

module.exports = {
    command: handle_song,
    command_name: "play"
}
