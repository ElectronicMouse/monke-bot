const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('subject')
        .setDescription('information about subject')
        .addStringOption(option =>
            option.setName('katedra')
                .setDescription('katedra at which subject is taught')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('subject')
                .setDescription('subject you want info about')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('rozvrh')
                .setDescription('if you want schedule')
                .setRequired(true)),
    async execute(interaction) {
        const katedra = interaction.options.getString('katedra');
        const predmet = interaction.options.getString('subject');
        const rozvrh = interaction.options.getBoolean("rozvrh")
        if (!rozvrh) {
            fetch("https://stag-ws.zcu.cz/ws/services/rest2/predmety/getPredmetInfo?zkratka=" + predmet + "&outputFormat=JSON&katedra=" + encodeURI(katedra.toUpperCase()))
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    const reply = "Katedra: " + data.katedra + "\n" + "Zkratka předmětu: " + data.zkratka + "\n" + "Název předmětu: " + data.nazev + "\n" + "Zakončení předmětu: " + data.typZkousky + "\n" + "Kreditové ohodnocení: " + data.kreditu + "\n" + "Učí se v zimním semestru: " + data.vyukaZS + "\n" + "Učí se v letním semestru: " + data.vyukaLS;
                    if (reply.length != 0) {
                        interaction.reply(reply)
                    }
                    else { interaction.reply("error") }
                }).catch(err => {
                    console.log(err)
                });
        }
        else if (rozvrh) {
            fetch("https://stag-ws.zcu.cz/ws/services/rest2/rozvrhy/getRozvrhByPredmet?semestr=%25&zkratka=" + predmet + "&outputFormat=JSON&katedra=" + encodeURI(katedra.toUpperCase()))
                .then(function (response) {

                    return response.json();

                }).then(function (data) {
                    let repl = ""
                    let reply = ""

                    for (let i = 0; i < data.rozvrhovaAkce.length; i++) {
                        if (!!data.rozvrhovaAkce[i].ucitel) {
                            repl += (i + 1) + ". " + "\n" + "Vyučující: " + data.rozvrhovaAkce[i].ucitel.titulPred + " " + data.rozvrhovaAkce[i].ucitel.jmeno + " " + data.rozvrhovaAkce[i].ucitel.prijmeni + " " + data.rozvrhovaAkce[i].ucitel.titulZa + "\n" + "Místo: " + data.rozvrhovaAkce[i].budova + data.rozvrhovaAkce[i].mistnost + "\n" + "Rozvrhová akce: " + data.rozvrhovaAkce[i].typAkce + "\n" + "Týden: " + data.rozvrhovaAkce[i].tyden + "\n" + "Den: " + data.rozvrhovaAkce[i].den + " od: " + data.rozvrhovaAkce[i].hodinaSkutOd.value + " do: " + data.rozvrhovaAkce[i].hodinaSkutDo.value + "\n\n";
                        }
                    }
                    if (repl.includes("null",)) {
                        reply = repl.replace(/null/g, "")
                        if (reply.length == 0) {
                            interaction.reply("Eng: can´t read the file it might not exist, look if your arguments are in correct order with !help predmet.\nČj: nemohu načíst daný soubor, je možné že neexistuje, koukněte se také jestli jsou argumenty pro hledání ve správném pořadí pomocí příkazu !help predmet.")
                        }
                        if (reply.length > 0) {
                            if (reply.length < 1997) { interaction.reply(reply) }
                            if (reply.length > 1996) {
                                for (let i = 0; i < (reply.length / 1996); i++) {
                                    let repl = reply.substring((0 + i * 1996), (1996 + i * 1996));
                                    interaction.reply(repl)
                                }

                            }
                        }
                    }
                })
        }
    }
}
