const Discord = require("discord.js");
const stripIndents = require("common-tags");

module.exports = {
	name: 'ban',
	description: 'Bans the user from the server.',
	usage: 'ban [user] [reason]',
	execute(message, args) {

	let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!bUser) return message.channel.send("Can't find user.");
	let bReason = args.join(" ").slice(22);
	if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to ban someone.")
	if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That user can't be banned.");

	let banEmbed = new Discord.RichEmbed()
	.setTitle("**User Banned**")
	.setColor("#bc0000")
	.setTimestamp()
	.setDescription(stripIndents`**Banned User:** ${bUser}
		**Reason:** ${bReason}
		**Banned By:** ${message.author}`);

	let banChannel = message.guild.channels.find(channel => channel.name === "logs");
	if(!banChannel) return message.channel.send("Can't find channel.");

	message.delete();
	bUser.ban(bReason);
	banChannel.send(banEmbed);

	return;

	},
};
