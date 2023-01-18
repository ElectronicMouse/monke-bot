const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('classroom')
        .setDescription('information about classroom')
        .addStringOption(option =>
            option.setName('classroom')
                .setDescription('Classroom shortname (KL from KL301')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('classroom_number')
                .setDescription('Classroom number (301 from KL301')
                .setRequired(true)),
    async execute(interaction) {
        const classroom = interaction.options.getString('classroom');
        const classroom_Number = interaction.options.getString('classroom_number');
        fetch("https://stag-ws.zcu.cz/ws/services/rest2/mistnost/getMistnostiInfo?zkrBudovy=" + classroom + "&pracoviste=%25&typ=%25&outputFormat=JSON&cisloMistnosti=" + classroom_Number)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            try {
                let reply = "odkaz na mapy: " + data.mistnostInfo[0].urlBudova;
                if (reply.length == 0) {
                    interaction.reply("Eng: can´t read the file it might not exist, look if your arguments are in correct order with !help predmet.\nČj: nemohu načíst daný soubor, je možné že neexistuje, koukněte se také jestli jsou argumenty pro hledání ve správném pořadí pomocí příkazu !help predmet.");
                }
                if (reply.length > 0) {
                    interaction.reply(reply);
                }
            } catch (error) {
                console.log(error);
                interaction.reply("some arguments might be wrong, or there is problem with connection");
            }
        }).catch(function (err) {
            console.log('node-fetch error: ', err);
            interaction.reply("some arguments might be wrong, or there is problem with connection");
          });
    }
}