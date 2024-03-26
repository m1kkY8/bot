const queue = [];

function shift_queue(){
    return queue.shift();
}

function push_queue(url){
    queue.push(url); 
}

module.exports = {
    shift_queue,
    push_queue
}
