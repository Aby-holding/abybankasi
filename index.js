const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder, AuditLogEvent } = require("discord.js");
const Discord = require("discord.js");
const fs = require("fs")
const karaliste = require("./commands/karaliste");
const chalk = require("chalk")


const client = new Client({
    intents: Object.values(Discord.IntentsBitField.Flags),
    partials: Object.values(Partials)
});

const PARTIALS = Object.values(Partials);

const db = require("croxydb")

global.client = client;
client.commands = (global.commands = []);
const { readdirSync } = require("fs")
const config = require("./config.json");
readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    client.commands.push({
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,
        dm_permission: false,
        type: 1
    });

    console.log(chalk.blue(`[COMMAND]`) + ` ${props.name} Yüklendi`)

});
readdirSync('./events').forEach(e => {

    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log(chalk.red(`[EVENT]`) + ` ${name} Yüklendi`)
});


client.login(config.token)

process.on("unhandledRejection", (reason, p) => {
    console.log(reason, p);
})

process.on("unhandledRejection", async (error) => {
  return console.log("Error: " + error)

})

 client.on("interactionCreate", async interaction => {

 if(interaction.customId === 'sozlesme') {
    
    const modal = new ModalBuilder()
    .setCustomId('main')
    .setTitle('Sözleşme Formu');

    const form1 = new Discord.TextInputBuilder()
    .setCustomId('sozlesmeform1')
    .setLabel('Adınız ve Soyadınız? / Ahmet Yılmaz')
    .setStyle(Discord.TextInputStyle.Short)
    .setRequired(true);

    const form2 = new Discord.TextInputBuilder()
    .setCustomId('sozlesmeform2')
    .setLabel('Doğum Tarihiniz? / 01.01.2000')
    .setStyle(Discord.TextInputStyle.Short)
    .setRequired(true);

    const form3 = new Discord.TextInputBuilder()
    .setCustomId('sozlesmeform3')
    .setLabel('Telefon Numaranız? / 0534 567 89 01')
    .setStyle(Discord.TextInputStyle.Short)
    .setRequired(true)
    .setMaxLength(15)

    const form4 = new Discord.TextInputBuilder()
    .setCustomId('sozlesmeform4')
    .setLabel('E-posta Adresiniz? / abybankası@gmail.com')
    .setStyle(Discord.TextInputStyle.Short)
    .setRequired(true);

    const form5 = new Discord.TextInputBuilder()
    .setCustomId('sozlesmeform5')
    .setLabel('Kabul Ediyormusunuz?')
    .setStyle(Discord.TextInputStyle.Short)
    .setRequired(true);

    const action1 = new ActionRowBuilder().addComponents(form1);
    const action2 = new ActionRowBuilder().addComponents(form2);
    const action3 = new ActionRowBuilder().addComponents(form3);
    const action4 = new ActionRowBuilder().addComponents(form4);
    const action5 = new ActionRowBuilder().addComponents(form5);
    
    modal.addComponents(action1, action2, action3, action4, action5);
     interaction.showModal(modal)
 }
})

client.on("interactionCreate", async interaction => {

if(interaction.customId === 'main') {

    const sozlesmechannel = config.sozlesmechannel

    const action1 = interaction.fields.getTextInputValue('sozlesmeform1')
    const action2 = interaction.fields.getTextInputValue('sozlesmeform2')
    const action3 = interaction.fields.getTextInputValue('sozlesmeform3')
    const action4 = interaction.fields.getTextInputValue('sozlesmeform4')
    const action5 = interaction.fields.getTextInputValue('sozlesmeform5')

    const log = new Discord.EmbedBuilder()
    .setTitle('Yeni Birisi Sözleşme Doldurdu')
    .setAuthor({ name: `${interaction.guild.name} | ${interaction.guild.id}`, iconURL: interaction.guild.iconURL()})
    .setDescription(`Adı Soyadı: \`${action1}\`\nDoğum Tarihi: \`${action2}\`\nTelefon Numarası: \`${action3}\`\nE-Posta Adresi: \`${action4}\`\nOnay: \`${action5}\``)
    .setFooter({ text: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true, size: 1024 })})

    client.channels.cache.get(sozlesmechannel).send({ embeds: [log]})
   db.add(`sozlesmesayi`, +1)
   db.add(`tumsozlesmesayi_${interaction.guild.id}`, +1)
}


})

client.on(Discord.Events.InteractionCreate, async interaction => {
	if (!interaction.isModalSubmit()) return;
	if (interaction.customId === 'main') {
		await interaction.reply({ content: 'Sözleşme gönderildi!', ephemeral: true });
	}
});

//-----------------------KARALİSTE--------------------------\\

client.on('interactionCreate', async interaction => {

    if (!interaction.guild) return;
  
    const { user, customId, guild } = interaction;
  
    if(interaction.isButton()) {
      if(interaction.customId === `reddet_${user.id}`) {
  
        interaction.update({ content: `<@${db.get(`karaliste`).user}> kullanıcısını karalisteye eklemedim.`, embeds: [], components: [] })
        db.delete(`karaliste`)
      }
      
  
      if(interaction.customId === `onayla_${user.id}`) {
        interaction.update({ content: `<@${db.get(`karaliste`).user}> kullanıcısını \`${db.get(`karaliste`).sebep}\` sebebinden karalisteye ekledim.`, embeds: [], components: []});
        db.add(`karalistesayi`, 1)
      }
    }

//s

    if(interaction.isButton()) {
    if (!interaction.guild) return;

    const { user, customId, guild } = interaction;

    if(interaction.customId === `reddett_${user.id}`) {
      return interaction.update({ content: `<@${db.get(`karaliste`).user}> Kullanıcıyı kara listeden çıkarmadım.`, embeds: [], components: [] })
    }
    

    if(interaction.customId === `onay_${user.id}`) {

        interaction.update({ content: `<@${db.get(`karaliste`).user}> Kullanıcıyı başarıyla kara listeden çıkardım.`, embeds: [], components: []});

        const kullanıcı = db.get(`karaliste`).user
        let sebep = db.get(`karaliste`).sebep
        
      db.delete(`karaliste`, { user: kullanıcı.id, yt: interaction.user.id, sebep: sebep })
      
     if(db.get(`karalistesayi`) === 1) {
        db.delete(`karalistesayi`)
      }
      if(db.get(`karalistesayi`) > 1) {
      db.add(`karalistesayi`, -1)
      }
    }
  }
})