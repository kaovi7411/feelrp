const Discord = require('discord.js');
exports.run = (client, message, args) => {

  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: Uyarı :warning:', '`kız` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.sendEmbed(ozelmesajuyari); }
  let guild = message.guild
  let user = message.mentions.users.first();
  let modlog = guild.channels.find('name', 'mod-log');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', '🌹 Cadı');
  if (!modlog) return message.reply('`mod-log` kanalını bulamıyorum.').catch(console.error);
  if (!muteRole) return message.reply('`🌹 Cadı` adlı bir rol bulamıyorum.').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('Kime bu rolü vereceğimi yazmalısın.').catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Eylem:', 'Kız Kayıt')
    .setThumbnail(user.avatarURL)
    .addField('Kullanıcı:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Yetkili:', `${message.author.username}#${message.author.discriminator}`);

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('Gerekli izinlere sahip değilim.').catch(console.error);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
      guild.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
    });
  } else {
      message.guild.member(user).removeRole("599765095525908513")
    message.guild.member(user).addRole(muteRole).then(() => {
      guild.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
    });
  }

  message.channel.send(
  new Discord.RichEmbed()
    .setAuthor('Kız Üye')
    .setColor('RANDOM')
    .addField('Kayıt Edilen Kullanıcı:', `${user.username}`)
    .setThumbnail(user.avatarURL)
    .addField('Kayıt Eden Yetkili:', `${message.author.username}#${message.author.discriminator}`)
 )

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'kız',
  description: 'Belirtilen Kişiye kız rolü verir.',
  usage: 'sustur [kullanıcı] [sebep]'
};
