const Discord = require('discord.js');
const fs = require("fs");

const warnings = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports = {
	name: 'warn',
	description: 'Issues a warning to a user.',
	usage: 'warn [username] [reason]',
	execute(message, args) {

try {
	if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You do not have permission to warn someone.");
	let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
	if(!user) return message.reply("Can't find user.");

	let wrole = message.guild.roles.find('name', 'WARNED');
	//let jrole = message.guild.roles.find('name', 'Prisoner');
	let reason = args.join(" ").slice(22);
//	let warnlevel = warnings[user.id].warnings;

	if(!warnings[user.id]) warnings[user.id] = {
		warnings: 0
		};

	warnings[user.id].warnings++;

	fs.writeFile("./warnings.json", JSON.stringify(warnings), (err) => {
		if (err) console.log(err);
	});

	let warnEmbed = new Discord.RichEmbed()
	.setTitle("Warning Issued")
	.setColor("#ffff00")
	.addField("Warned User:", `${user}`)
	.addField("Reason", reason)
	.addField("Warnings:", warnings[user.id].warnings)
	.addField("Warned By", `${message.author.username}`)
	.setTimestamp();

/*	let jailEmbed = new Discord.RichEmbed()
	.setDescription("**Punishment**")
	.setColor("#8D021F")
	.addField("Jailed User", `${jUser}`)
	.addField("Jailed By", `${message.author.username}`)
	.setTimestamp(); */

	message.delete();
	let warnchannel = message.guild.channels.find(channel => channel.name === "logs");
	if(!warnchannel) return message.channel.send("Couldn't find logs channel.");

	warnchannel.send(warnEmbed);

	if(this.client.warnings.get(`${user.id}`, "warnings") == 1) {
		user.addrole(wrole.id);
	}

	message.user.send(`You have been warned for reason.`);
/*
	if(this.client.warnings.get(`${user.id}`, "warnings") == 3) {
		user.removeRoles(user.roles);
		user.addRole(jrole.id);
		warnchannel.send(jailEmbed);
}

setTimeout(function() {
	jUser.removerole.jrole.id;
}, ms("24h"));
 */
}catch (error) {
	console.log(error);
}
}
}
