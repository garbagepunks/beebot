const Discord = require("discord.js");
const fs = require("fs");
const orbiters = JSON.parse(fs.readFileSync("./orbiters.json", "utf8"));
//const oUser = require("./orbiting.JSON");

module.exports = {
	name: 'orbiters',
	description: 'Allows you to see your number of orbiters.',
	usage: 'orbiters',
	execute(message, args) {
		let user = message.author.id;
		let orbitercount = orbiters[user].orbiters;

		message.channel.send(`${message.author.username}, you have ${orbitercount} orbiters.`);

	},
};
