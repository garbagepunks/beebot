const Discord = require('discord.js');
const fs = require("fs");
const { stripIndents } = require("common-tags");

const warnings = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports = {
	name: 'warn',
  category: 'moderation',
	description: 'Issues a warning to a user.',
	usage: '[username] [reason]',
	async execute(message, args) {

try {
	if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You do not have permission to warn someone.");
	let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!user) return message.reply("Can't find user.");

	let wrole = message.guild.roles.get("612716413098131456");
	let reason = args.slice(1).join(" ");
	if(!reason) return message.reply("Please provide a reason for warning this user.");
//	let warnlevel = warnings[user.id].warnings;

	if(!warnings[user.id]) warnings[user.id] = {
		warnings: 0
		};

	warnings[user.id].warnings++;

	await fs.writeFile("./warnings.json", JSON.stringify(warnings, null, 4), (err) => {
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
  
	let warnchannel = message.guild.channels.find(channel => channel.name === "logs");
	if(!warnchannel) return message.channel.send("Couldn't find logs channel.");

	await warnchannel.send(warnEmbed);
  
  await user.addRole(wrole.id);
  
  await message.delete(5000);
  
await user.send(`You have been warned in ${message.guild.name} for ${reason}.  You have ${warnings[user.id].warnings} warnings.`);
}catch (error) {
	console.log(error);
}
}
}

