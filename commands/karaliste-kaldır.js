const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField, ButtonStyle } = require("discord.js");
const db = require("croxydb");
const config = require("../config.json")

module.exports = {
  name: "karaliste-kaldır",
  description: "Kullanıcıyı karalisteden kaldırır.",
  type: 1,
  options: [

    {
      name: "kullanıcı",
      description: "Karalistesi kaldıralacak kullanıcıyı gir.",
      type: 6,
      required: true
      }

  ],
  run: async (client, interaction) => {

    const kullanıcı = interaction.options.getMember('kullanıcı')
    let sebep = interaction.options.getString('sebep')
    
    await interaction.deferReply();
    const { user, options, guild } = interaction;

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.followUp({ content: "Bunu sen kullanamazsın?", ephemeral: true })
    }


    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`onay_${user.id}`)
        .setLabel('Evet')
        .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
        .setCustomId(`reddett_${user.id}`)
        .setLabel('Hayır')
        .setStyle(ButtonStyle.Secondary),
    );


    const embed = new EmbedBuilder()
    .setAuthor({name: `${interaction.user.tag}`, iconURL: interaction.user.avatarURL()})
    .setTitle(`Karaliste`)
    .setDescription(`${kullanıcı} kullanıcısını karalisteden kaldırmak istiyormusun?`)

    interaction.followUp({embeds: [embed], components: [row]})
  }
}