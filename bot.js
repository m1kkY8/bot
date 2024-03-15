const { Client, Events, GatewayIntentBits, Partials, EmbedBuilder, MessageActivityType} = require('discord.js');
const { token } = require('./config.json');

const Stations = require('./modules/stations.js'); 
const play_radio = require('./modules/radio.js');
const play_song = require('./modules/music.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Channel,
        Partials.Message
    ]
});

const station_list = [];
Object.entries(Stations).forEach((ent) => {
    let val = ent[1];
    station_list.push(val);
})

function generateRadioTable(station_list){
    let radio_table = "";
    for(let i = 0; i < station_list.length; i++){
        radio_table += `${i + 1}. ${station_list[i].name} \n`;
    }
    return radio_table;
}

client.on(Events.MessageCreate, (message) => {
    const command = message.content.toLowerCase().split(" ");

    if(command[0] === '!radio'){
        if(command[1]){
            const station_number = Number.parseInt(command[1]) - 1;
            if(station_number > station_list.length - 1){
                message.reply("Losa stanica jebem te ustima");
                return;
            }
            play_radio(message, station_list[station_number]);
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
});

client.on(Events.MessageCreate, (message) => {
    if(message.content.toLowerCase() === '!play'){
        play_song(message);
    }
});

client.once(Events.ClientReady, () => {
    console.log('online');
});

client.login(token);
