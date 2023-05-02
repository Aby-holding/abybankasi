const { Collection, EmbedBuilder } = require("discord.js");
const db = require("croxydb");
const { readdirSync } = require("fs");

module.exports = async (client, interaction) => {

  if (interaction.isChatInputCommand()) {
    if (!interaction.guildId) return;
    readdirSync('./commands').forEach(f => {
      const cmd = require(`../commands/${f}`);
      if (interaction.commandName.toLowerCase() === cmd.name.toLowerCase()) {
        let kullanıcı = interaction.options.getMember('kullanıcı')
        let sebep = interaction.options.getString('sebep')

const embed = new EmbedBuilder()
.setTitle(`Hey!`)
.setDescription(`\`${db.get("karaliste.sebep")}\` sebebiyle karalistedesin.`)
.setImage("https://i.pinimg.com/originals/d1/34/49/d13449fb76b34cb71584f5bfb7c6dee9.gif")

        if (interaction.member.id === db.fetch(`karaliste.user`)) return interaction.reply({embeds: [embed]})

        return cmd.run(client, interaction, db);
      }
    });
  }
};
