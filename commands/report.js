const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../functions.js");

module.exports = {
	name: 'report',
  category: 'moderation',
	description: 'Logs reports',
	usage: '[user] [reason]',
	execute(message, args) {


  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!rUser) return message.channel.send("Couldn't find user.");
    
	let reason = args.slice(1).join(" ");
	if(!reason) return message.channel.send("Redo the command and actually say what you're reporting this person for.");
    
  let reportschannel = message.guild.channels.get("630066314571939850");
	if(!reportschannel) return message.channel.send("Can't find reports channel.");
 

	let reportEmbed = new Discord.RichEmbed()
	.setTitle("Reports")
	.setColor("#ffff00")
	.setTimestamp()
	.setDescription(stripIndents`**User:** ${rUser}
	**Reported By:** ${message.author.username}
	**Reason:** ${reason}`);

try {
	message.delete(5000);
	reportschannel.send(reportEmbed);
  message.author.send("Thank you for submitting a report to the staff of **The Hive.**  Your report is in review.")
}
    catch(e) {
      console.log(e);
    }
}
};

