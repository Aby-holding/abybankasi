const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Discord = require("discord.js");
const db = require("croxydb")

module.exports = {
    name: "sözleşme",
    description: "Sözleşme mesajını atar.",
    type: 1,
    options: [],

    run: async (client, interaction) => {

        const yetki = new EmbedBuilder()
            .setDescription("Bu komudu kullanabilmek için `Yönetici` yetkisine sahip olmalısın.")

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki], ephemeral: true })
        
        const embed = new EmbedBuilder()
        .setTitle(`AbyBankası - Sözleşme`)
        .setDescription(`Bu sunucuya katılabilmek için **kullanıcı sözleşmesini** doldurmanız gerekli.\n\n> Doğru bilgileri girmezseniz ceza alabilirsiniz.`)

        await interaction.deferReply();

        const row = new Discord.ActionRowBuilder()
        .addComponents(
        new Discord.ButtonBuilder()
        .setCustomId('sozlesme')
        .setLabel('Sözleşme')
        .setEmoji('🎗️')
        .setStyle(Discord.ButtonStyle.Secondary)
        )

    interaction.followUp({ content: `Sözleşme embedi gönderildi.`, ephemeral: true}).then(x => setTimeout(() => x.delete(), 5000)) 
     return interaction.channel.send({ embeds: [embed], components: [row] })
        
    }
};
