const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');

const fetch = require('node-fetch');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('eastereggu')
        .setDescription('hehe'),
    async execute(interaction) {

        const exampleEmbed = new EmbedBuilder()
    .setColor('#29a7ff')
    .setTitle('ZČU in its prime')
    .setURL('https://www.zcu.cz/cs/index.html')
    .setAuthor({ name: 'Fellow student', iconURL: 'https://i.imgur.com/faZa8Dy.jpg', url: 'https://www.webopedia.com/definitions/easter-egg/' })
    .setImage('https://i.imgur.com/hrGSlnX.png')
    .setThumbnail('https://i.imgur.com/JtzjDbx.png')
    interaction.reply({ embeds: [exampleEmbed] });
    }
}
