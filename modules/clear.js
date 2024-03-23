function clear(message){
    message.channel.messages.fetch({limit: 100})
        .then( msg =>  message.channel.bulkDelete(msg));
}


module.exports = {
    command_name: 'clear',
    command: clear
}
