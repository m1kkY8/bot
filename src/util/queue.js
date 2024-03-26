const play = require('play-dl');
const queue = [];

function shift_queue(){
    return queue.shift();
}

function push_queue(url){
    queue.push(url); 
}

function print_queue(){
    console.log(queue);
}

async function get_table(message){

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

function get_len(){
    return queue.length;
}

module.exports = {
    shift_queue,
    push_queue,
    print_queue,
    get_table,
    now_playing,
    get_len
}
