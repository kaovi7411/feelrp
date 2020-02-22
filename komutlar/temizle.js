const Discord = require('discord.js');


exports.run = function(client, message, args) {
//Komutun Kodları
  const m = args.join(' ');
  if(!m) return message.channel.send('**:gear: Bir miktar girmelisiniz!**');
  if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('**:xx: Bu işlem için gerekli izne sahip değilsiniz!**');
  if(m < 2) return message.channel.send(':gear: **En az 2 mesaj silebilirim!**')
 if(m>100) return message.channel.send('**:gear: En fazla 100 mesaj silebilirim!**')
  message.channel.bulkDelete(m);
  

  message.channel.send(
  new Discord.RichEmbed()
    .setTitle(':gear: **Başarılı!**')
    .setDescription('**Başarı ile __'+m+'__ mesaj sildim! :gear:**')
  .setColor('0x36393E')
  ).then(i=>{
    i.react(':gear: 585186945471086620')
  }  
  )
};

exports.conf = {
  enabled: true,//True => Komut açık, False => Komut kapalı 
  guildOnly: false, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: ['temizle','delete','sil'],//Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: ["MANAGE_MESSAGES" , "ADMINISTRATOR"] //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: 'temizle',//Komutun adı (Komutu girerken lazım olucak)
  description: 'Belirlediğiniz miktarda mesaj siler',//Komutun Açıklaması
  category:'yetkili',
  usage: 'temizle 100' //komutun kullanım şekli; ÖR: !ban @Kullanıcı
}