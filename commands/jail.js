const Discord = require("discord.js");
const ms = require("parse-ms");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../functions.js");

module.exports = {
	name: 'jail',
  category: 'moderation',
	description: 'Removes all roles from a user except the restricted prisoner role',
	usage: '[user, reason]',
	async execute(message, args) {

	let jUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!jUser) return message.channel.send("Couldn't find user.");
    
  let reason = args.slice(1).join(" ");
  if(!reason) reason = "No reason provided.";
    
	if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`Nice try ${message.author.username}, but you do not have permission to jail someone.`);
    
	let jrole = message.guild.roles.find(role => role.name === "Prisoner");
    
	if(jUser.hasPermission("MANAGE_ROLES")) return message.channel.send(`${jUser.username} is too powerful.`);
    
  if(message.guild === null) return message.channel.send("Please send this in a server channel, not a DM!");

	let jailEmbed = new Discord.RichEmbed()
	.setTitle(`Jailed User`)
	.setColor("#bc0000")
	.setTimestamp()
	.setDescription(stripIndents`**Jailed User:** ${jUser}
	**Reason:** ${reason}
	**Jailed By:** ${message.author.username}`);

	let jailchannel = message.guild.channels.get("632769031199522826");
	if(!jailchannel) return message.channel.send("Couldn't find logs channel.");

		try {
			await jUser.removeRoles(jUser.roles)
			await jUser.addRole(jrole.id)
			await jailchannel.send(jailEmbed)
			await message.delete(5000);
		} catch(e) {
			console.error(e);
		}

	setTimeout(() => {
		jUser.removeRole(jrole.id);
	}, 86400000);

}
};

