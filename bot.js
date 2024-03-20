const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./config.json');

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

//TODO: ZA IMPLEMENTACIJU
//Ako ima jos neka komanda
//Eventualno prebaciti radio da bude slash komanda mada i ne mora
//Probati dal radi muzika sa yta

// Radio handler
client.on(Events.MessageCreate, message => {
    if(message.content.toLowerCase().startsWith('!radio')){
        handle_radio(message, client);
    }
});

client.once(Events.ClientReady, () => {
    console.log('online');
});

client.login(token);
