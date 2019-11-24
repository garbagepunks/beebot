const Discord = require("discord.js");

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
	.addField("Server Name:", `${message.guild.name}`)
	.addField("Owned By:", `${message.guild.owner}`)
	.addField("Member Count:", `${message.guild.memberCount}`)
	.addField("Created:", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
	.setThumbnail(message.guild.iconURL);

	message.channel.send(hEmbed);

	},
};
