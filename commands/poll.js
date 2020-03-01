const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
	name: 'poll',
	description: 'Creates a poll with thumbs up or thumbs down reactions.',
	usage: '(anon) [question]',
	execute(message, args) {

	if (args[0] === "anon") {
    let question = args.slice(1).join(" ");
    
    let anonembed = new Discord.RichEmbed()
  .setTitle(`Question for the ${message.guild.name}:`)
	.setDescription(question)
	.setColor("#ffff00")
 // .setFooter(`Asked by ${message.author.username}`)
	.setTimestamp();
    
  let pollChannel = message.guild.channels.get("626535081439395860");
	if(!pollChannel) return message.author.send("Can't find channel.");
    
    message.delete(5000);
	  pollChannel.send(anonembed).then(async embedMessage => {
		await embedMessage.react('👍');
		await embedMessage.react('👎');
	});
    
  }else {
    
  let question = args.join(" ");
  if(!question) return;

	let embed = new Discord.RichEmbed()
	.setTitle("Question for the Hive:")
	.setDescription(question)
	.setColor("#ffff00")
  .setFooter(`Asked by ${message.author.username}`)
	.setTimestamp();

	let pollChannel = message.guild.channels.get("626535081439395860");
	if(!pollChannel) return message.author.send("Can't find channel.");
    
  if(message.guild === null) return message.channel.send("Please send this in a server channel, not a DM!");

	message.delete(5000);
	pollChannel.send(embed).then(async embedMessage => {
		await embedMessage.react('👍');
		await embedMessage.react('👎');
	});
  }
	return;

	},
};


