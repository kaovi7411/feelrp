const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
var prefix = ayarlar.prefix
exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('#FF0000')
.setTitle('<a:patlyoz:680041727285002268> Müzik Yardım Komutları')
.setTimestamp()
.addField('<a:patlyoz:680041727285002268> -Çal- Müzik Dinlersiniz', prefix + 'çal ')
.addField('<a:patlyoz:680041727285002268> -Ses- Müziğin Sesin Ayarlarsınız', prefix + 'ses 1/100')
.addField('<a:patlyoz:680041727285002268> -Geç- Şarkıyı Geçersiniz', prefix + 'geç')
.addField('<a:patlyoz:680041727285002268> -Çalan- Çalan Şarkı Hakkında Bilgi Verir', prefix + 'çalan')
.addField('<a:patlyoz:680041727285002268> -Duraklat- Şarkıyı Durdurursunuz', prefix + 'duraklat')
.addField('<a:patlyoz:680041727285002268> -Devam- Şarkıyı Devam Ettirirsiniz', prefix + 'devam')
.addField('<a:patlyoz:680041727285002268> -Sıra- Kuyruğu Görürsünüz', prefix + 'sıra')
.setFooter('Owner Kaovi  Müzik', client.user.avatarURL)
.setTimestamp()
.setThumbnail(client.user.avatarURL)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['y','yardım','müzik','muzik','komutlar'], 
  permLevel: 0 
};

exports.help = {
  name: 'müzik',
  description: 'Tüm komutları gösterir.',
  usage: 'müzik'
};