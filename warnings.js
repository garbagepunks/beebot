const Discord = require("discord.js");
const fs = require("fs");
let warnings = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports = {
	name: 'warnings',
	description: 'Checks how many warnings a user has.',
	usage: 'warnings [username]',
	execute(message, args) {

  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Couldn't find that user.");
  let warnlevel = warnings[wUser.id].warnings;

  if(!warnings[wUser.id]) warnings[wUser.id] = {
    warnings: 0
  };

  message.channel.send(`${wUser.username} has ${warnlevel} warnings.`);

}
}
