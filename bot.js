const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
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
    console.log(message.content);
})

//client.on(Events.MessageCreate, (message) => {
//});

client.once(Events.ClientReady, () => {});

client.login(token);
