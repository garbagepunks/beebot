const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
	name: 'suggest',
	description: 'Logs server suggestions.',
	usage: 'suggest [suggestion]',
	aliases: ['suggestion'],
	execute(message, args) {

	let suggestion = args.join(" ").slice();

	let sugEmbed = new Discord.RichEmbed()
	.setTitle("Server Suggestion")
	.setDescription(suggestion)
	.setColor("#ffff00")
	.setTimestamp();

	let sugChannel = message.guild.channels.find(channel => channel.name === "suggestions");
	if(!sugChannel) return message.channel.send("Can't find channel.");

	message.delete();
	sugChannel.send(sugEmbed).then(async embedMessage => {
		await embedMessage.react('✅');
		await embedMessage.react('❌');
	});

	return;

	},
};
