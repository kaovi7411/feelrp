const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const keep_alive = require('./keep_alive.js')

require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm selam,  hoş geldin ^^');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '!dc') {
    msg.delete();
    msg.reply('⭐ Discord sunucumuzun linki : https://discord.gg/6SX5ETQ  ⭐');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '!bakım') {
    msg.delete();
    msg.channel.send('```⭐ Sunucuyu kısa bir süreliğine bakıma almaktayız. Anlayışınız için teşekkürler ⭐```');
    msg.channel.send("@everyone")
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '!restart') {
    msg.delete();
    msg.channel.send('⭐ Restart atlıyor. Aktif oldugunda Duyuru gecilcektir.  ⭐');
    msg.channel.send("@everyone")
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '!aktif') {
    msg.delete();
    msg.channel.send('```⚡️Sunucu Aktif Launcher üzerinden giriş yapabilirsiniz.⚡️```'); 
    msg.channel.send("@everyone")
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '!destek') {
    msg.delete();
    msg.reply('Destek bekleyen biri var !           <@&644027819617288233> <@&644027820472795186> <@&644027817272803339> <@&644027818707124255>  <@&644027818128441354>   <@&644027819323818004>   <@&644027821060128768>   <@&644027821622034432> <@&644027821949190155>   ');
  }
});


client.on('message', msg => { 
  if (msg.content.toLowerCase() === '!kayıt') { 
    msg.delete();
    msg.channel.send(' Kayıt olmak için <#644027866157285376> da ki linke tıklayarak formu doldurunuz.');
    msg.channel.send(' Kabul edildiğiniz taktirde yetkililer sizi çağıracaktır.');
    msg.channel.send(' Onaylananları <#644027867499331592> bu kanaldan takip edebilirsiniz.');
    msg.channel.send(' Dev Roleplay İyi Roller Diler.   <@&644027851665965056>   '); 
    
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '!ts3') {
    msg.delete();
    msg.reply('```⚡️Teamspeak3 Adresimiz : devrp ⚡️```');
  }
});


client.on("message", message => {
    const dmchannel = client.channels.find("name", "dm-log");
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        dmchannel.sendMessage("", {embed: {
            color: 3447003,
            title: `Gönderen: ${message.author.tag}`,
            description: `Bota Özelden Gönderilen DM: ${message.content}`
        }})
    }
});


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'kayıt') {
       msg.member.removeRole("599765095525908513")
    msg.reply('Kayıtsız Rolü Başarıyla Alındı.');
  }
});



//Kaovi Tarafından yazılmıştır. cnslink.cf
client.on('ready', () => {
  const moment = require("moment");
require("moment-duration-format");

 setInterval(() => {
const calismasure = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
let botdurum = client.channels.find(c => c.id === '602734736678584370')//Botun sürekli mesaj atacağı kanal.
const botistatistik = new Discord.RichEmbed()
	.setColor('RED')
	.setTitle('= Bot İstatistikleri =')
	
.addField(`RAM`,`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/512mb`)
.addField(`Çalışma Süresi`,`${calismasure}`)
.addField(`Ping`,`${client.ping}`)
.addField(`discord.js`,`v${Discord.version}`)
.addField(`Bilgi`,`${client.guilds.size.toLocaleString()} sunucu ve ${client.users.array().length} kullanıcıya hizmet veriyor.`)
.setTimestamp()
.setFooter('Exe', 'https://www.canes.cf/images/caneslogo.png');
//https://cnslink.cf
botdurum.send(botistatistik);
      //Kaovi tarafından yazılmıştır.
  }, 1800000); //Milisaniye cinsinden. 1 saniye =  1000 milisaniye. Örnek Olarak 1 saat = 3600000milisaniye
  //https://convertlive.com/tr/u/dönüştürmek/milisaniye/a/saniye Bu siteden hesaplamasını yapabilirsiniz.
});
































client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("MOVE_MEMBERS")) permlvl = 1;
  if (message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) permlvl = 2;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 4;
  if (message.author.id === ayarlar.sahip) permlvl = 5;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });





;

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

















client.login(ayarlar.token);

client.on('guildMemberAdd', (member) => {
    const guild = member.guild;


 let sChannel = member.guild.channels.find(c => c.name === 'bot-koruma')

    if(member.user.bot !==true){

    } 
    else {

    sChannel.send(`**Kaovi Koruma Sistemi**
Sunucuya Bir Bot Eklendi Ve Güvenlik Nedeniyle Banlandı
Banlanan Bot: **${member.user.tag}**
@everyone`)
    .then(() => console.log(`yasaklandı ${member.displayName}`))
    .catch(console.error);
       member.ban(member) 
  }  
  });