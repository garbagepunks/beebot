const Discord = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
	name: 'info',
	description: 'Displays server info.',
	aliases: ['serverinfo'],
	execute(message, args) {

	function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };

	let hEmbed = new Discord.RichEmbed()
	.setTitle("Server Info")
	.setThumbnail(message.guild.iconURL)
	.setDescription(stripIndents`**Server Name:** ${message.guild.name}
	**Owned By:** ${message.guild.owner}
	**Member Count:** ${message.guild.memberCount}`);

	message.channel.send(hEmbed);

	},
};
