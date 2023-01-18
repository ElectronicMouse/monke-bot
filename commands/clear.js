const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('clears chat')
        .addIntegerOption(option=>
                option.setName('number')
                .setDescription('number of messages to delete')
                .setRequired(true)),
    async execute(interaction) {
        var number = interaction.options.getInteger("number")
        const channel = interaction.channel
        if(number>80)
        {
        number = 80
        }
        const { size } =  channel.bulkDelete(number, true)
        const reply = "deleted " + size + " message(s)."
        if (interaction) { return reply }
        console.log(reply)
    }
}