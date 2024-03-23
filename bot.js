const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./config.json');

const amogus = require('./modules/youtue.js');
const handle_radio = require('./modules/radio.js');

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

// TODO: ZA IMPLEMENTACIJU
//Ako ima jos neka komanda
//Eventualno prebaciti radio da bude slash komanda mada i ne mora
//Probati dal radi muzika sa yta

// Radio handler
client.on(Events.MessageCreate, message => {
    if(message.content.toLowerCase().startsWith('!radio')){
        handle_radio(message, client);
    } else if(message.content.toLowerCase().startsWith('.play')){
        amogus(message, client);
    }
});

client.once(Events.ClientReady, () => {
    console.log('Srecko Online');
});

client.login(token);
