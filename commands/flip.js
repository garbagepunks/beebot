const Discord = require("discord.js");

module.exports = {
	name: 'flip',
  category: 'fun',
	description: 'Flips a coin',
	usage: '[question]',
  aliases: ['coin, coinflip'],
	execute(message, args) {

		var rand = ["Heads.", "Tails."];
    
    let result = Math.floor(Math.random() * rand.length);

		message.channel.send(rand[result]);

}
};


