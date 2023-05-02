const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField, ButtonStyle } = require("discord.js");
const db = require("croxydb");
const config = require("../config.json");

module.exports = {
  name: "karaliste",
  description: "Kullanıcıyı karalisteye atar.",
  type: 1,
  options: [

    {
      name: "kullanıcı",
      description: "Karalisteye eklenecek kullanıcıyı seç.",
      type: 6,
      required: true
      },
      {
        name: "sebep",
        description: "Bir sebep gir.",
        type: 3,
        required: true
        }

  ],
  run: async (client, interaction) => {

    const kullanıcı = interaction.options.getMember('kullanıcı')
    const sebep = interaction.options.getString('sebep')

    if(db.fetch(`karaliste`, { user: kullanıcı.id, yt: interaction.user.id, sebep: sebep })) {

      return interaction.reply({content: "Bu kullanıcı zaten karalistede.", ephemeral: true })
    }

    await interaction.deferReply();
    const { user, options, guild } = interaction;

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.followUp({ content: "Bunu sen kullanamazsın?", ephemeral: true })
    }


    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`onayla_${user.id}`)
        .setLabel('Evet')
        .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
        .setCustomId(`reddet_${user.id}`)
        .setLabel('Hayır')
        .setStyle(ButtonStyle.Secondary),
    );


    const embed = new EmbedBuilder()
    .setAuthor({name: `${interaction.user.tag}`, iconURL: interaction.user.avatarURL()})
    .setTitle(`Karaliste`)
    .setDescription(`${kullanıcı} kullanıcısını \`${sebep}\` sebebinden karalisteye almak istiyormusun?`)

    db.set(`karaliste`, { user: kullanıcı.id, yt: interaction.user.id, sebep: sebep })
  
    interaction.followUp({embeds: [embed], components: [row]})
  }
}
