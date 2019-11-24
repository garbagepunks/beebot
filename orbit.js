const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const orbiters = JSON.parse(fs.readFileSync("./orbiters.json", "utf8"));

module.exports = {
	name: 'orbit',
	description: 'Allows you to orbit someone.',
	usage: 'orbit [user]',
	execute(message, args) {

try {

		let oUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!oUser) return message.channel.send("You're trying to orbit nobody???");
 // if(oUser = message.author.id) return message.reply("You can't orbit yourself, you conceited sack of shit.");

		if (!orbiters[oUser.id]) orbiters[oUser.id] = {
    orbiters: 0
  };

  	orbiters[oUser.id].orbiters++;

	let orbitercount = orbiters[oUser.id].orbiters;

		message.channel.send(`You are now orbiting ${oUser}. They have ${orbitercount} orbiters.`);
		message.channel.send(oEmbed);

		fs.writeFile("./orbiters.json", JSON.stringify(orbiters), (err) => {
			if (err) console.log(err);
		});



	}catch (error) {
		console.log(error);
	}
	},
};
