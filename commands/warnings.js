const Discord = require("discord.js");
const fs = require("fs");
let warnings = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports = {
	name: 'warnings',
  category: 'moderation',
	description: 'Checks how many warnings a user has.',
	usage: '[username]',
  aliases: 'warns',
	execute(message, args) {

  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!args[0]) wUser = message.author;
  let warnlevel = warnings[wUser.id].warnings;

  if(!warnings[wUser.id]) warnings[wUser.id] = {
    warnings: 0
  };
    

  message.channel.send(`${wUser} has ${warnlevel} warning(s).`);
}
}

