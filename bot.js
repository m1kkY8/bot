const { Client, Events, GatewayIntentBits, Partials, EmbedBuilder} = require('discord.js');
const { token } = require('./config.json');

const STATIONS = require('./modules/stations.js'); 
const play_radio = require('./modules/radio.js');
const play_song = require('./modules/music.js');

const log = console.log 

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
Object.entries(STATIONS).forEach((ent) => {
    let val = ent[1];
    station_list.push(val);
})

function generateRadioTable(station_list){
    let message_content = "";
    for(let i = 0; i < station_list.length; i++){
        message_content += `${i + 1}. ${station_list[i].name} \n`;
    }

    return message_content;
}

client.on(Events.MessageCreate, (message) => {
    log(message.content);
})

client.on(Events.MessageCreate, (message) => {
    const command = message.content.toLowerCase().split(" ");

    if(command[0] === '!radio'){
        if(command[1]){
            const station_number = Number.parseInt(command[1]) - 1;
            play_radio(message, station_list[station_number]);
        } else {
            const radio_table = generateRadioTable(station_list);
            
            message.reply(radio_table);
        }
    }
});

client.on(Events.MessageCreate, (message) => {
    if(message.content.toLowerCase() === '!play'){
        play_song(message);
    }
});

client.once(Events.ClientReady, () => {
    log('online');
});

client.login(token);
