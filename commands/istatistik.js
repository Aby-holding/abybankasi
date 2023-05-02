const { Client, EmbedBuilder } = require("discord.js");
const moment = require("moment");
  require("moment-duration-format");
  const os = require("os");

module.exports = {
  name: "istatistik",
  description: "Botun istatistiklerini atar.",
  type: 1,
  options: [],

  run: async(client, interaction) => {
    const Uptime = moment
    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
    const embed = new EmbedBuilder()
    .setAuthor({ name: `Aby Bankası | İstatistikler`})
    .addFields({ name: 'Bot Sahibi', value: `\`\`\`fix\nabyofficial\`\`\``, inline: false})
    .addFields({ name: 'Bellek Kullanımı', value: `\`\`\`fix\n${(process.memoryUsage().heapUsed /1024 /512).toFixed(2)}MB\`\`\``, inline: true})
    .addFields({ name: 'Çalışma Süresi', value: `\`\`\`fix\n${Uptime}\`\`\``, inline: true})
    .addFields({ name: 'Kullanıcılar', value: `\`\`\`fix\n${client.users.cache.size}\`\`\``, inline: false})
    .addFields({ name: 'Sunucular', value: `\`\`\`fix\n${client.guilds.cache.size}\`\`\``, inline: false})
    .addFields({ name: 'Kanallar', value: `\`\`\`fix\n${client.channels.cache.size}\`\`\``, inline: false})
    .addFields({ name: 'İşletim Sistemi', value: `\`\`\`fix\nWindows 10 | 64 Bit\`\`\``, inline: false})
    .addFields({ name: 'İşlemci', value: `\`\`\`fix\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``, inline: false})
    .addFields({ name: 'Discord.JS sürüm', value: `\`\`\`fix\n14.7.1\`\`\``, inline: true})
    .addFields({ name: 'Node.JS sürüm', value: `\`\`\`fix\nv18.9.1\`\`\``, inline: true})
    .addFields({ name: 'Bot Kuruluş', value: `\`\`\`fix\n02.10.2021\`\`\``, inline: true})
    .addFields({ name: 'Komut Sayısı', value: `\`\`\`fix\nBilinmiyor\`\`\``, inline: true})
    .addFields({ name: 'Ping', value: `\`\`\`fix\n${client.ws.ping}\`\`\``, inline: true})
    interaction.reply({embeds: [embed]})

  }

};
