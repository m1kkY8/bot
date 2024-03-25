const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { test_token , prefix } = require('./config.json');

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

const commands = [];

const commands_path = path.join(__dirname, 'modules');
const commands_files = fs.readdirSync(commands_path)
    .filter( file => file.endsWith('.js') && !file.startsWith('station'));

for (const file of commands_files){
    const file_path = path.join(commands_path, file);

    const command = require(file_path);
    commands.push(command);

}

console.log(`loaded ${commands.length} commands`);

client.on(Events.MessageCreate, message => {

    if (message.content.toLowerCase().startsWith(prefix)){
        const args = message.content.toLowerCase().split(' ');
        const cmd_name = args[0].substring(1);
        const command = commands
            .find(cmd => cmd.command_name.startsWith(cmd_name));
        
        if(command){
            command.command(message);
        }
    } 
});

client.once(Events.ClientReady, () => {
    console.log('Srecko Online');
});

client.login(test_token);
