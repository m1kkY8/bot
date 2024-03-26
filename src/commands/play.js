const play = require('play-dl');
const { get_len, push_queue, shift_queue, get_table, now_playing, print_queue} = require('../util/queue.js');
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
        setTimeout(() => terminate(), 2000);
    }
    play_song();
    
    return;
});

function terminate(){
    subscription.unsubscribe();
    subscription = null;
    is_playing = false;
    connection.destroy();
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

async function search_song(query){
    const yt_info = await play.search(query, {limit: 1});
    const url = yt_info[0].url;
    console.log(url);
    print_queue();
    return url;
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

async function handle_song(message){
    connection = get_connection(message);
    const args = message.content.split(' ');
    args.shift();
    const arg = args.shift();
    const query = args.toString();

    if(!args){
        message.reply(`ne znam sta da radim majmune`);
        return;
    }

    if(arg === 'search' && query){
        const url = await search_song(query);
        
        if(is_playing){
            push_queue(url);
        } else {
            push_queue(url);
            play_song();
        }

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
