const Discord = require("discord.js");
const ms = require("ms");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../functions.js");

module.exports = {
	name: 'unjail',
  category: 'moderation',
	description: 'Removes the Prisoner role from a user',
	usage: '[user]',
	async execute(message, args) {
    
	let jUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!jUser) return message.channel.send("Couldn't find user.");
    
	if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`Nice try ${message.author.username}.`);
    
	let jrole = message.guild.roles.find(role => role.name === "Prisoner");
    
	if(jUser.hasPermission("MANAGE_ROLES")) return message.channel.send(`${jUser.username} is too powerful.`);
    
  if(message.guild === null) return message.channel.send("Please send this in a server channel, not a DM!");

	let unjailEmbed = new Discord.RichEmbed()
	.setTitle(`Unjailed User`)
	.setColor("#bc0000")
	.setTimestamp()
	.setDescription(stripIndents`**Unjailed User:** ${jUser}
	**Unjailed By:** ${message.author.username}`);

	let jailchannel = message.guild.channels.get("632769031199522826");
	if(!jailchannel) return message.channel.send("Couldn't find logs channel.");

		try {
			await jUser.removeRole(jrole.id)
			await jailchannel.send(unjailEmbed)
			await message.delete(5000);
		} catch(e) {
			console.error(e);
		}
}
};


