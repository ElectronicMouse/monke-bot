const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('poll about something'),
    async execute(interaction) {
        interaction.reply('Reacting with fruits!');
		const message = await interaction.fetchReply();
		message.react('🍎');
		message.react('🍊');
		message.react('🍇');
	}
    
}