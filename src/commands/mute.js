function mute_self(message){
    message.guild.members.me.voice.setMute(true);
}

module.exports = {
    command: mute_self,
    command_name: 'mute'
}
