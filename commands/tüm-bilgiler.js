const { Client, EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "tüm-bilgiler",
  description: "Botun data bilgilerini atar.",
  type: 1,
  options: [],

  run: async(client, interaction) => {
    
    if(interaction.user.id != '752910734748549161') return interaction.reply({ content: `Bunu sen kullanamazsın?`, ephemeral: true})

    const karaliste = db.get(`karalistesayi`) || `0`
    const sözleşme = db.get(`sozlesmesayi`) || `0`

    const embed = new EmbedBuilder()
    .setAuthor({ name: `Aby Bankası | Tüm Datalar`})
    .setDescription(`Toplamda \`${sözleşme}\` kişi sözleşmeyi kabul etmiş.\nToplamda \`${karaliste}\` kişi karalistede.`)

    interaction.reply({embeds: [embed]})

  }

};
