const Discord = require("discord.js");

module.exports = {
	name: 'addrole',
	description: 'Gives a role to a user.',
	aliases: 'giverole',
	execute(message, args) {

	if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You cannot manage roles.");
	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!rUser) return message.reply("Can't find user.");
	let role = args.join(" ").slice(22);
	if(!role) return message.reply("I don't think you specified a role?");
	let gRole = message.guild.roles.find('name', role);
	if(!gRole) return message.reply("Couldn't find that role");

	if(rUser.roles.has(gRole.id)) return message.reply(`${rUser} already has that role!`);
	rUser.addRole(gRole.id);

	message.channel.send(`${rUser} has been given the role ${gRole}`);
},
};
