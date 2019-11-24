const Discord = require("discord.js");

module.exports = {
	name: 'report',
	description: 'Logs reports',
	usage: 'report [user] [reason]',
	execute(message, args) {


let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!rUser) return message.channel.send("Couldn't find user.");
	let rreason = args.join(" ").slice(22);

	let reportEmbed = new Discord.RichEmbed()
	.setTitle("Reports")
	.setColor("#ffff00")
	.addField("Reported User", `${rUser}`)
	.addField("Reason", rreason)
	.addField("Reported By", `${message.author}`)
	.setTimestamp();

	let reportschannel = message.guild.channels.find(channel => channel.name === "logs");
	if(!reportschannel) return message.channel.send("Can't find channel.");

	message.delete();
	reportschannel.send(reportEmbed);

}
};
