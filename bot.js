const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
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

//log messages
client.on(Events.MessageCreate, (message) => {
    log(message.content);
})

client.on(Events.MessageCreate, (message) => {
    const command = message.content.toLowerCase().split(" ");

    if(command[0] === '!radio'){
        const station = command[1];
        if (station.toLowerCase() === 'play'){
            play_radio(message, STATIONS.PlayRadio);          
        } else if (station.toLowerCase() === 'pakao'){
            play_radio(message, STATIONS.PakaoRadio);
        }


    }
});

client.on(Events.MessageCreate, (message) => {
    if(message.content.toLowerCase() === '!play'){
        play_song(message);
    }
});

client.once(Events.ClientReady, () => {
    log('amogus');
});

client.login(token);
