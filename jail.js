const Discord = require('discord.js');
const fs = require("fs");
const { stripIndents } = require("common-tags");

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

	let wrole = message.guild.roles.find(role => role.name === "WARNED");
	//let jrole = message.guild.roles.find('name', 'Prisoner');
	let reason = args.join(" ").slice(22);
	if(!reason) return message.reply("Please provide a reason for warning this user.");
//	let warnlevel = warnings[user.id].warnings;

	if(!warnings[user.id]) warnings[user.id] = {
		warnings: 0
		};

	warnings[user.id].warnings++;

	fs.writeFile("./warnings.json", JSON.stringify(warnings, null, 4), (err) => {
		if (err) console.log(err);
	});

	let warnEmbed = new Discord.RichEmbed()
	.setTitle("Warning Issued")
	.setColor("#ffff00")
	.setTimestamp()
	.setDescription(stripIndents`**Warned User:** ${user}
	**Reason:** ${reason}
	**Warnings:** ${warnings[user.id].warnings}
	**Warned By:** ${message.author.username}`);


	message.delete();
	let warnchannel = message.guild.channels.find(channel => channel.name === "logs");
	if(!warnchannel) return message.channel.send("Couldn't find logs channel.");

	warnchannel.send(warnEmbed);

//	if(this.client.warnings.get(`${user.id}`, "warnings") == 1) {
//		user.addrole(wrole.id);
//	}

}catch (error) {
	console.log(error);
}
}
}
