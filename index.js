const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
const { stripIndents } = require("common-tags");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
this.channels = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
			client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {

	if(message.author.bot) return;

  if (message.content.startsWith(prefix)) {

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
  
 } else if(!message.content.startsWith(prefix)) { 
    
  //Dating Channels React  

 if(message.channel.id === "619965922903326742" || message.channel.id === "619965965068795904") {
    try {
    message.react('❤️')
                  .then(() => message.react('💔'));
  }catch(e) {
    console.log(e);
  };
 }; //Close dating channels react
 }; //Close else if
 }); // Close message listener


//Cache New Members
client.on('guildMemberAdd', (member) => {
  client.fetchUser(member.id, true);
});


//Send Goodbye Message
client.on('guildMemberRemove', (member) => {
  
  var goodbyes = [
	`Press F to pay respects to **${member.displayName}**.`,
	`**${member.displayName}** has ascended.`,
	`The wild **${member.displayName}** used teleport.`,
	`Why did you set me on fire, **${member.displayName}**? Why didn\'t you just write your essay?`,
	`**${member.displayName}**: Gone but not forgotten.`,
	`**${member.displayName}** has decided to leave the server...Effective immediately.`,
	`Ouch, **${member.displayName}** let the door hit them on the way out.`,
	`Farewell, **${member.displayName}**.`,
	`**${member.displayName}** lost the game.`,
  `**${member.displayName}** has abandoned us in this hell hole.`,
	`**${member.displayName}** has bailed on us.`,
  `**${member.displayName}** vanished in a puff of smoke.`,
  `**${member.displayName}** disappeared without a trace.`,
  `Adieu, Adieu, to you and you and **${member.displayName}**.`,
  `Way to go, guys. You bullied **${member.displayName}** out of the server.`,
	`In the words of Fall Out Boy, thanks for the memories, **${member.displayName}**.`,
	`**${member.displayName}** went MIA.`,
  `**${member.displayName}** couldn\'t hang.`,
	`**${member.displayName}** has abandoned me...just like my father.`,
	`Ding, Dong! The **${member.displayName}** is dead!`];

	var goodbyemessage = Math.floor(Math.random() * goodbyes.length);


try {
		client.channels.get("606901598635163708").send(goodbyes[goodbyemessage]);
} catch(error){
    console.log("[ERROR]",error)}
}
);



client.login(process.env.TOKEN);
