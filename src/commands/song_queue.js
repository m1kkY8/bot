const { is_queue_empty, get_queue} = require('../util/queue.js');

function song_queue(message){
    
    const queue = get_queue(); 

    if(is_queue_empty()){
        message.reply('Nema vise');
        return;
    }
 
    let content = "";
    let index = 1;
    for (const song of queue){
        content += (`${index++}. ${song.title} \n`);
    }

    message.reply(content);
}

module.exports = {
    command: song_queue,
    command_name: "queue"
}
