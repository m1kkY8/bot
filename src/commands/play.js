const play = require('play-dl');
const { 
    createAudioPlayer,
    joinVoiceChannel,
    createAudioResource,
    AudioPlayerStatus,
} = require('@discordjs/voice');


const player = createAudioPlayer();
const queue = [];
let is_playing = false; 
let connection;
let subscription;

player.on(AudioPlayerStatus.Idle, () => {
    if(queue.length === 0){
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
async function show_queue(message){

    if(queue.length === 0){
        message.reply('Nema vise');
        return;
    }

    let content = "";
    let index = 1;
    for (const song of queue){
        const info = await play.video_basic_info(song);
        content += (`${index++}. ${info.video_details.title} \n`);
    }

    message.reply(`${content}`);
}

async function now_playing(message){
    const url = queue[0];
    const info = await play.video_basic_info(url);
    message.reply(`${info.video_details.title}`);
}

async function play_song(){
    if (queue.length){

        const url = queue[0];
        const stream = await play.stream(url);
        const audio_resource = createAudioResource(stream.stream, {inputType: stream.type});
        
        player.play(audio_resource);
        subscription = connection.subscribe(player);

        is_playing = true;
        queue.shift();
    }
}

function handle_song(message){
    connection = get_connection(message);
    const s = "";
    const arg = message.content.split(' ')[1];
    if(!arg){
        message.reply(`link majmune`);
        return;
    }

    if (arg === 'np'){
        now_playing(message); 
        return;
    } else if (arg === 'q'){
        show_queue(message);
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
        queue.push(arg);
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
