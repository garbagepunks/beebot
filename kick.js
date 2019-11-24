const Discord = require("discord.js");

module.exports = {
	name: 'kick',
	description: 'Kicks the user from the server.',
	usage: 'kick [user] [reason]',
	execute(message, args) {

	let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!kUser) return message.channel.send("Can't find user.");
	let kReason = args.join(" ").slice(22);
	if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have permission to kick someone.")
	if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That user can't be kicked.");

	let kickEmbed = new Discord.RichEmbed()
	.setTitle("Kick")
	.setColor("#e56b00")
	.addField("Kicked User", `${kUser}`)
	.addField("Reason", kReason)
	.addField("Kicked By", `<@${message.author.id}>`)
	.setTimestamp();

	let kickChannel = message.guild.channels.find(channel => channel.name === "logs");
	if(!kickChannel) return message.channel.send("Can't find channel.");

	message.delete();
	kUser.kick(kReason);
	kickChannel.send(kickEmbed);

	return;
	},
};
