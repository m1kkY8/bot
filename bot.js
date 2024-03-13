const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./config.json');

const radio = require('./modules/stations.js');

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
    if(message.content.toLowerCase() === '!radio'){
        play_radio(message);
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
