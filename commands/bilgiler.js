const { Client, EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "bilgiler",
  description: "Sunucunun data bilgilerini atar.",
  type: 1,
  options: [],

  run: async(client, interaction) => {
    
    const sözleşme = db.get(`tumsozlesmesayi_${interaction.guild.id}`) || `0`

    const embed = new EmbedBuilder()
    .setAuthor({ name: `Aby Bankası | Sunucu Datalar`})
    .setDescription(`Toplamda \`${sözleşme}\` kişi sözleşmeyi kabul etmiş.`)

    interaction.reply({embeds: [embed]})

  }

};
