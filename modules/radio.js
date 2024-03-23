const { EmbedBuilder } = require('discord.js');
const { 
    createAudioPlayer, 
    joinVoiceChannel, 
    createAudioResource, 
    StreamType, 
    NoSubscriberBehavior } = require('@discordjs/voice');

const Stations = require('./stations.js');

const station_list = [];
Object.entries(Stations).forEach((ent) => {
    let val = ent[1];
    station_list.push(val);
})

function generateRadioTable (station_list){
    let radio_table = "";
    for(let i = 0; i < station_list.length; i++){
        radio_table += `${i + 1}. ${station_list[i].name} \n`;
    }
    return radio_table;
}

function play_radio(message, station){
    
    const { url, name } = station

    const player = createAudioPlayer({
        behaviors: NoSubscriberBehavior.Play
    });

    const song = createAudioResource(url, {inputType: StreamType.Arbitrary });
    const channel = message.member.voice.channel;

    if(!channel){
        message.reply(`nisi u vojsu majmune`);
        return;
    }

    const connection = joinVoiceChannel({
        channelId: channel.id, 
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator });

    connection.subscribe(player);
    player.play(song);

    message.reply(`Svira ${name}`);
}

function handle_radio(message){
    const command = message.content.toLowerCase().split(" ");

    if(command[1]){

        const station_number = parseInt(command[1]) - 1;

        if(isNaN(station_number) || station_number > station_list.length - 1){
            message.reply('jebem te ustima');
            return;
        }

        play_radio(message, station_list[station_number]);

    } else {
        const radio_table = generateRadioTable(station_list);
        const embed = new EmbedBuilder()
        .setColor(0x800080)
        .setTitle('Radio')
        .addFields( { name: 'Dostupne Stanice', value: radio_table })
        .setTimestamp();

        message.reply({embeds: [embed] });
    }
}

module.exports = {
    command_name: 'radio',
    command: handle_radio
}
