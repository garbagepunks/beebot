const Discord = require("discord.js");
//const client = new Discord.client();

module.exports = {
	name: 'confess',
	description: 'Send this command as a direct message to Bee Bot and it will post your confession anonymously.',
	usage: '[confession]',
	aliases: ['confession'],
	async execute(message, args) {

	if (message.channel.type === "dm") {

	let confession = args.join(" ").slice();
  
  if(!args[0]) return message.reply("You can't send an empty confession.");

	let fetchedUser = await message.client.fetchUser("301212599381393409");

	let confEmbed = new Discord.RichEmbed()
	.setTitle("Anonymous Confession")
	.setDescription(confession)
	.setColor("#ffff00")
	.setTimestamp();

	let confessChannel = message.client.channels.get("618350345718071316");
	if(!confessChannel) return message.reply("Couldn't find confessions channel.");

	try {
	await confessChannel.send(confEmbed);
	await message.author.send("Confession has been posted.");
	await fetchedUser.send(`${message.author.username} sent ` + confession);
} catch(e) {
	console.log(e);
}

	}
    if(!message.guild === "606898838254518405") {
      try {
        message.channel.send("I can only post confessions that were sent to me in a DM.");
      }catch (e){
        console.log(e)
      }
    }
}
};

