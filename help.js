const Discord = require('discord.js');
const client = require('discord.js');
const RichEmbed = require('discord.js');
const { stripIndents } = require("common-tags");
const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'Displays a list of commands.',
	usage: 'help',
  aliases: ['commands'],
	execute(message, args) {
  
  const data = [];
  const { commands } = message.client;
    
    try {
      
      if(!args.length) {
        
    let helpEmbed = new Discord.RichEmbed()
    .setTitle(`${message.guild.me.displayName} Help`)
    .addField("Moderation:", stripIndents`
    Ban
    Jail
    Kick
    Mute
    Purge
    Removewarn
    Unjail
    Warn`, true)
    .addField("Info:", stripIndents`Help
    ServerInfo
    Warnings
    UserInfo`, true)
    .addBlankField()
    .addField("Utilities:", stripIndents`Confess
    Poll
    QOTD
    Report
    Suggest`, true)
    .addField("Fun:", stripIndents`8Ball
    Coinflip
    Kill`, true)
    .setColor("#ffff00")
    .setFooter("Use !help {command} for help with a specific command.");
        
    message.channel.send(helpEmbed);
      }
      
    else if(args[0])  {
        
    const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
       
    data.push(`**Name:** ${command.name}`);
        
      if (!command.name) {
			return message.reply('That is not a valid command.  Are you using an alias?');
		}
        
   	if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);

		message.channel.send(data, { split: true });
      
}
    }
    catch(e) {
      console.log(e);
    }
  }
  };
