const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('semester')
        .setDescription('information about semester'),
    async execute(interaction) {
        fetch("https://stag-ws.zcu.cz/ws/services/rest2/kalendar/getAktualniObdobiInfo?outputFormat=JSON")
         .then(function (response) {
            return response.json();
         })
         .then(function (data) {
            let reply = "Rok: " + data.akademRok+"/"+(Number(data.akademRok)+1) + "\n" + "Období: " + data.obdobi + "\n" + "Začátek: " + data.prvniDenStavajicihoAkademickehoRoku.value + "\n" + "Konec: " + data.posledniDenStavajicihoAkademickehoRoku.value;
            interaction.reply(reply);
         })
    }
}