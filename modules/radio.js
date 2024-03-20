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

function play_radio(message, stations){

    const station_url = stations.url;
    const station_name = stations.name;

    const player = createAudioPlayer({
        behaviors: NoSubscriberBehavior.Play
    });

    const song = createAudioResource(station_url, {inputType: StreamType.Arbitrary });
    const channel = message.member.voice.channel;

    if(channel != null){
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator 
        })

        connection.subscribe(player);
        player.play(song);

        message.reply(`Playing ${station_name}`);

    } else {
        message.reply(`nisi u vojsu majmune`);
        return;
    }
}

function handle_radio(message, client){
    const command = message.content.toLowerCase().split(" ");

    if(command[1]){
        
        let station_number;
        try {
            station_number = Number.parseInt(command[1]) - 1;
            play_radio(message, station_list[station_number]);

        } catch (error){
            message.reply('jebem te ustima');
            return;
        }

        if(station_number > station_list.length - 1){
            message.reply("Losa stanica jebem te ustima");
            return;
        }

    } else {
        const radio_table = generateRadioTable(station_list);

        const embed = new EmbedBuilder()
            .setColor(0x800080)
            .setTitle('Radio')
            .setAuthor({name: client.user.username})
            .addFields( { name: 'Dostupne Stanice', value: radio_table })
            .setTimestamp();

        message.reply({embeds: [embed] });
    }
}

module.exports = handle_radio;
