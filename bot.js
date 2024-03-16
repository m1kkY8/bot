const { Client, Events, Collection, GatewayIntentBits, Partials, EmbedBuilder, MessageActivityType} = require('discord.js');
const { token } = require('./config.json');

const fs = require('node:fs');
const path = require('node:path');

const Stations = require('./modules/stations.js'); 
const play_radio = require('./modules/radio.js');

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

client.once(Events.ClientReady, () => {
    console.log('online');
});

client.login(token);
