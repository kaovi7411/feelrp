const Discord = require("discord.js");
const db = require('quick.db');
exports.run = (client, message, args) => {
  const kayıtlı = message.guild.roles.find(r => r.id === "644027846695583745"); //buraya erkek rolünüzün id'sini koyun
  const log = message.guild.channels.find(c => c.id === "679717701542739968"); //buraya kayıt log id koyun
  const tag = "戈";
  if(!message.member.roles.array().filter(r => r.id === "644027817272803339")[0]) { //buraya kayıt sorumlusu rolünün id'sini giriniz. SUNUCU AYARLARINDAN kopyalayın.
    return message.channel.send("Yeterli yetkiniz bulunmuyor.");
  } else {
    let member = message.mentions.users.first() || client.users.get(args.join(' '))
      if(!member) return message.channel.send("Bir kullanıcı girin.")
    const c = message.guild.member(member)
    c.addRole(kayıtlı)
    const embed = new Discord.RichEmbed()
    .setAuthor("Whitelist kaydı Onaylandı!")
    .addField(`Kaydı yapılan\n`, `${c.user.tag}`)
    .addField(`Kaydı yapan\n`, `${message.author.tag}`)
    .setFooter("-Kaovi | WL sistemi")
    .setColor("BLUE")
    log.send(embed)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "wl",
  description: "",
  usage: ""
};