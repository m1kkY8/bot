const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("reply pong"),

    async execute(interaction){
        interaction.reply("pong");
    },

};
