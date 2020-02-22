const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MOVE_MEMBERS")) return message.reply(`:warning: Bunu yapabilmek için gerekli yetkiye sahip değilsiniz!`)
  let isim = args.slice(1).join(' ');
  let kullanici = message.mentions.users.first();
  if(!kullanici) return message.reply(`:warning: Lütfen bir kullanıcı giriniz! \nDoğru Kullanım; \`${prefix}isim @${client.user.username}#${client.user.discriminator} <yeni isim>\``)
  if(!isim) return message.reply(`:warning: Lütfen bir kullanıcı adı giriniz! \nDoğru Kullanım; \`${prefix}isim @${client.user.username}#${client.user.discriminator} <yeni isim>\``)
  if(isim.length > 32) return message.reply(`:warning: Lütfen \`32\` karakteri geçmeyecek şekilde bir isim giriniz!`)
  message.guild.members.get(kullanici.id).setNickname(`${isim}`)
  message.channel.send(`:white_check_mark: Başarılı bir şekilde \`${kullanici.username}\` adlı kişinin kullanıcı adı \`${isim}\` olarak değiştirildi.`)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['isim'],
    permLevel: 2,
}

exports.help = {
    name: 'isim değiştir',
    description: 'Belirttiğiniz kullanıcının kullanıcı adını değiştirir.',
    usage: 'isim @kullanıcı <kullanıcı adı>'
}
