const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../functions.js");



module.exports = {
	name: 'kick',
  category: 'moderation',
	description: 'Kicks the user from the server.',
	usage: 'kick [user] [reason]',
	async execute(message, args) {

	let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!kUser) return message.channel.send("Can't find user.");
    
	let reason = args.slice(1).join(" ");
  if(!reason) reason = "No reason provided.";
    
	if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`Nice try ${message.author.username}, but you do not have permission to kick someone.`)
	if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That user can't be kicked.");

	let kickEmbed = new Discord.RichEmbed()
	.setTitle("User Kicked")
	.setColor("#e56b00")
	.setTimestamp()
  .setDescription(stripIndents`**Kicked User:** ${kUser.displayName}
  **Reason:** ${reason}
  **Responsible Moderator:** ${message.author.username}`);

	let kickChannel = message.guild.channels.find(channel => channel.name === "logs");
	if(!kickChannel) return message.channel.send("Can't find channel.");

	message.delete(5000);
	kUser.kick(reason);
	await kickChannel.send(kickEmbed);
 // await kUser.send(`You have been kicked from ${message.guild.name}`);

	return;
	},
};

