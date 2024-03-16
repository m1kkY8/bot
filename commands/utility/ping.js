const { Client, Events, GatewayIntentBits, Partials, EmbedBuilder, MessageActivityType} = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')
    .addStringOption(option =>
        option.setName('category')
        .setDescription('The gif category')
        .setRequired(false)
        .addChoices(
            { name: 'Funny', value: 'gif_funny' },
            { name: 'Meme', value: 'gif_meme' },
            { name: 'Movie', value: 'gif_movie' },
    )),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};
