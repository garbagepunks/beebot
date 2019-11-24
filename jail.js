const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
	name: 'jail',
	description: 'Removes all roles from a user except the restricted prisoner role',
	execute(message, args) {

	async () => {

	let jUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!jUser) return message.channel.send("Couldn't find user.");
	let jreason = args.join(" ").slice(22);
	if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to jail someone.")
	let jrole = message.guild.roles.find(role => role.name === "Prisoner");
	if(jUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That user can't be put in jail by you.");

	let jailEmbed = new Discord.RichEmbed()
	.setDescription("Jailed for 24 Hours")
	.setColor("#8D021F")
	.addField("Jailed User", `${jUser}`)
	.addField("Reason", jreason)
	.addField("Jailed By", `${message.author}`)
	.setTimestamp();

	let jailchannel = message.guild.channels.get("632769031199522826");
	if(!jailchannel) return message.channel.send("Couldn't find logs channel.");

		try {
			await jUser.removeRoles(jUser.roles)
			await jUser.addRole(jrole.id)
			await jailchannel.send(jailEmbed)
			await message.delete();
		} catch(e) {
			console.error(e);
		}
	}

	/* setTimeout(function() {
		jUser.removerole.jrole.id;
	}, ms("24h")); */

}
};
