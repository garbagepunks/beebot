const Discord = require("discord.js");

module.exports = {
  name: 'qotd',
  description: 'Bot posts a question of the day.',
  usage: 'qotd [args]',
  execute(message, args) {

  let qotd = args.join(" ");

  let embed = new Discord.RichEmbed()
  .setTitle("Question of the Day")
  .setDescription(qotd)
  .setColor("#ffff00")
  .setTimestamp();

  let qotdChannel = message.guild.channels.get("634977506122006559");
  if(!qotdChannel) return message.channel.send("Question of the Day channel could not be found.");

try {
  qotdChannel.send(embed);
  message.channel.send("Question successfully posted.");
} catch(error) {
  console.error(error);
}
  }
}
