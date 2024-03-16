const { Client, Events, Collection, GatewayIntentBits, Partials, EmbedBuilder, MessageActivityType} = require('discord.js');
const { token } = require('./config.json');

const fs = require('node:fs');
const path = require('node:path');

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

//slash commands handler
client.commands = new Collection(); 

const folders_path = path.join(__dirname, 'commands');
const commands_folder = fs.readdirSync(folders_path);

for (const folder of commands_folder) {

	const commands_path = path.join(folders_path, folder);
	const command_files = fs.readdirSync(commands_path).filter(file => file.endsWith('.js'));

	for (const file of command_files) {

		const filePath = path.join(commands_path, file);
		const command = require(filePath);

		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
} 

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if(!command) return;

    try {
        await command.execute(interaction);
    } catch(error){
        console.error(error);
    }
});

// Radio handler
client.on(Events.MessageCreate, message => {
    if(message.content.toLowerCase().startsWith('!radio')){
        handle_radio(message, client);
        console.log('ene');
    }
});

client.once(Events.ClientReady, () => {
    console.log('online');
});

client.login(token);
