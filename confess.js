const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
	name: 'confess',
	description: 'Sends an anonymous confession',
	usage: 'confess [confession]]',
	aliases: ['confession'],
	execute(message, args) {

	if (message.channel.type === "dm") {

	let confession = args.join(" ").slice();

	let confEmbed = new Discord.RichEmbed()
	.setTitle("Anonymous Confession")
	.setDescription(confession)
	.setColor("#ffff00")
	.setTimestamp();

	//let confessChannel = message.client.channels.find(channel => channel.name === "confessions");
	let confessChannel = message.client.channels.get("618350345718071316");
	if(!confessChannel) return message.reply("Couldn't find confessions channel.");

	confessChannel.send(confEmbed);
	message.author.send("Confession has been posted.");
	console.log(`${message.author.username} sent ` + confession);

	}
}
};
