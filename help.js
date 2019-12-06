const Discord = require('discord.js');
const { stripIndents } = require("common-tags");

module.exports = {
	name: 'help',
	description: 'Displays a list of commands.',
	usage: 'help',
  aliases: 'commands',
	execute(message, args) {

  let helpEmbed = new Discord.RichEmbed()
  .setTitle("Commands")
  .addField("**Mod Commands:**", stripIndents`Ban
    Kick
    Warn
    Jail
    Purge`, true)
  .addField("**All User Commands:**", stripIndents`Help
    Info
    Confess
    Report
    Suggest
    8ball`, true)
  .setColor("#ffff00");
    
  message.channel.send(helpEmbed);
},
};
