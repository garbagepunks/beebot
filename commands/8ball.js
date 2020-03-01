const Discord = require("discord.js");

module.exports = {
	name: '8ball',
	description: 'Magic 8 Ball Game.',
	usage: '[question]',
	execute(message, args) {

		if(!args[1]) return message.reply("You need to ask a full question.");
		let replies =
		["Probably not.",
		"ABSOLUTELY NOT.",
    "No way, José",
		"Yikes sweaty, this is why you're inkwell.",
		"Okay, fine, whatever.",
		"Can't figure it out for yourself, huh?",
		"Try again later, I'm sleeping.",
    "Begone, thot.",
    "Hell to the yeah.",
    "Anything your little heart desires.",
    "If I say yes will you go away?",
    "Definitely",
    "Sure, why not?",
    "If you really have to ask, you're dumber than I thought.",
    "Ouch, no need to shake me so hard.",
    "Without a doubt."
		]

		let result = Math.floor(Math.random() * replies.length);

		message.channel.send("🎱 " + replies[result]);

}
};

