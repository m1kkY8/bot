const { Client, Events } = require('discord.js');

const { token, prefix } = require('../config/config.json');
const { intents, partials } = require('../config/intents.js');

const { load_commands } = require('./util/command_handler.js');

const client = new Client({ intents, partials });

const commands = load_commands(); 

console.log(`loaded ${commands.length} commands`);

client.on(Events.MessageCreate, message => {

    if (message.content.toLowerCase().startsWith(prefix)){
        const args = message.content.toLowerCase().split(' ');
        const cmd_name = args[0].substring(1);
        const command = commands
            .find(cmd => cmd.command_name === cmd_name);
        
        if(command){
            command.command(message);
        }
    } 
});

client.once(Events.ClientReady, () => {
    console.log('Srecko Online');
});

client.login(token);
