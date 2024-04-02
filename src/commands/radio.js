const { get_song_info } = require('../util/get_song_info.js');

const player = require('../util/player.js');

const { 
    generate_radio_table,
    generate_list 
} = require('../util/stations.js');

const { 
    joinVoiceChannel,
    createAudioResource,
    StreamType,
    AudioPlayerStatus
} = require('@discordjs/voice');

let current_station = 0;
let subscription;
let connection;
const stations = generate_list();

player.on(AudioPlayerStatus.Paused, () => {
    if(subscription){
        subscription.unsubscribe();
        connection.destroy();
        return;
    } 
});

function play_radio(message, station){

    let { url, name } = station

    const song = createAudioResource(url, {inputType: StreamType.Arbitrary });
    const channel = message.member.voice.channel;

    if(!channel){
        message.reply(`nisi u vojsu majmune`);
        return;
    }
    
    connection = joinVoiceChannel({
        channelId: channel.id, 
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator });

    subscription = connection.subscribe(player);
    player.play(song);
        
    message.reply(`Svira ${name}`);
}

function handle_radio(message){
    const command = message.content.toLowerCase().split(" ");

    if(command[1] === 'np'){
        get_song_info(message, stations[current_station]);
        return;
    } else if (command[1] === 'stop'){
        player.pause();
        return; 
    }

    if(command[1]){
        current_station = parseInt(command[1]) - 1;

        if(isNaN(current_station) || 
            current_station > stations.length - 1 || 
            current_station.toString().length != command[1].length) {

            message.reply('jebem te ustima');
            return;
        }

        play_radio(message, stations[current_station]);

    } else {
        message.reply({embeds: [generate_radio_table()] });
    }
}

module.exports = {
    command_name: 'radio',
    command: handle_radio
}
