const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
	name: 'suggest',
  category: 'moderation',
	description: 'Logs server suggestions to a suggestions channel and allows reactions.',
	usage: '[suggestion]',
	aliases: ['suggestion'],
	execute(message, args) {

	let suggestion = args.join(" ");
  if(!suggestion) return;

	let sugEmbed = new Discord.RichEmbed()
	.setTitle("Server Suggestion")
	.setDescription(suggestion)
	.setColor("#ffff00")
  .setFooter(`Suggested by ${message.author.username}`)
	.setTimestamp();

	let sugChannel = message.guild.channels.find(channel => channel.name === "suggestions");
	if(!sugChannel) return message.author.send("Can't find channel.");
    
  if(message.guild === null) return message.channel.send("Please send this in a server channel, not a DM!");

	message.delete(5000);
	sugChannel.send(sugEmbed).then(async embedMessage => {
		await embedMessage.react('✅');
		await embedMessage.react('❌');
	});

	return;

	},
};

