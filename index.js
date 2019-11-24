const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
			client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

 	if (!command) return;

try {
	command.execute(message, args);
} catch (error) {
	console.error(error);
	message.reply('There was an error trying to execute that command.');
}
});

//Send Goodbye Message
client.on('guildMemberRemove', (member) => {

  var facts = [
	`Press F to pay respects to **${member.user}**.`,
	`**${member.user}** has ascended.`,
	`The wild **${member.user}** used teleport.`,
	`Why did you set me on fire, **${member.user}**? Why didn\'t you just write your essay?`,
	`**${member.user}**: Gone but not forgotten.`,
	`**${member.user}** has decided to leave the server...Effective immediately.`,
	`Ouch, **${member.user}** let the door hit them on the way out.`,
	`Farewell, **${member.user}**.`,
	`**${member.user}** lost the game.`,
	`**${member.user}** has bailed on us.`,
	`Thanks for the memories, **${member.user}**.`,
	`**${member.user}** went MIA.`,
	`**${member.user}** has abandoned me...just like my father.`,
	`Ding, Dong! The **${member.user}** is dead!`];

	var fact = Math.floor(Math.random() * facts.length);

//	let leaveChannel = client.channels.find(channel => channel.name === "entrances and exits");

try {
//	leaveChannel.send(facts[fact]);
		client.channels.get("606901598635163708").send(facts[fact]);
} catch(error){
    console.log("[ERROR]",error)}
});

//Send Ban Message
client.on('guildBanAdd', member => {

let banChannel = client.channels.find(channel => channel.name === "entrances and exits");

try {
		banChannel.send(`**${member.user}** has felt the wrath of the ban hammer.`);
} catch(error){
    console.log("[ERROR]",error)}
});


client.login(token);
