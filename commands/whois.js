const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../functions.js");

module.exports = {
	name: 'whois',
  category: 'info',
	description: 'Gets information about a user',
	usage: '[user]',
  aliases: ['userinfo'],
	async execute(message, args) {    

 // let memberToFind = message.guild.members.find(member => member.user.username == args[0] || member.id == args[0]);
 
//  if (!memberToFind) return message.channel.send('You must mention a member for this command'); //Send message and stop executing code
        
 function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };
    
  const member = getMember(message, args.join(" "));
    
  const roles = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r).join(", ") || 'none';
    
  let embed = new Discord.RichEmbed()
  .setAuthor(member.user.tag, member.user.avatarURL)
  .setColor("#ffff00")
  
 .setDescription(stripIndents `**Display Name:** ${member.displayName}
  **Account Created:** ${member.user.createdAt.toUTCString().substr(0, 16)}
  **Joined ${message.guild.name}:** ${member.joinedAt.toUTCString().substr(0, 16)}
  **Roles:** ${roles}`)
  
 /* .addField("Display Name:", `${member.displayName}`, true)
  .addField("Account Created:", `${member.user.createdAt.toUTCString().substr(0, 16)}`, true)
  .addField("Joined The Hive:", `${member.joinedAt.toUTCString().substr(0, 16)}`, true)
  .setTimestamp();*/
 
    message.channel.send(embed); 
  }
};
