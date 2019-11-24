const Discord = require("discord.js");

module.exports = {
	name: 'removerole',
	description: 'Removes a role from a user.',
	aliases: 'takerole',
	execute(message, args) {

	if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You cannot manage roles.");
	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!rUser) return message.reply("Can't find user.");
	let role = args.join(" ").slice(22);
	if(!role) return message.reply("I don't think you specified a role?");
	let gRole = message.guild.roles.find('name', role);
	if(!gRole) return message.reply("Couldn't find that role.");

	if(!rUser.roles.has(gRole.id)) return message.reply(`${rUser} does not have that role.`);
	rUser.removeRole(gRole.id);

	message.channel.send(`${rUser} no longer has the role ${gRole}`);
},
};
