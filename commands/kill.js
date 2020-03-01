const Discord = require("discord.js");

module.exports = {
	name: 'kill',
	description: 'Describes how a user died.',
  usage: '[user]',
	async execute(message, args) {
    
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!user) return message.reply("You need to mention someone to kill.");
    
    let deaths = [
    `${user.displayName} leaned too far over the railing at the zoo and fell in the gorilla habitat.  ${user.displayName} was torn limb from limb by Harambe.`,
    `${user.displayName}'s spouse put rat poison in their dinner.`,
    `${user.displayName} took a bath with a toaster.`,
    `${user.displayName} was elected president and passed some very unpopular laws.  ${user.displayName} was assassinated by a political opponent.`,
    `${user.displayName} decided to take a shortcut and drove through the bad part of town.  ${user.displayName} was caught in the crossfire of a gang shooting.`,
    `${user.displayName} was mistaken for an international terrorist and killed by a sniper.`,
    `${user.displayName} was kidnapped and managed to survive tied up in the basement for 48 days. Then the kidnapper fled town without telling anyone he had a captive, and ${user.displayName} starved to death after three days.`,
    `Don't try this at home, kids! ${user.displayName} has died after trying to recreate a stunt from Jackass.`,
    `${user.displayName} overdosed on tic tacs.`,
    `A monster has come to kill ${user.displayName} for not forwarding the chain letter fifteen years ago.`,
    `${user.displayName} donated money to a homeless person. How sweet! The homeless person was in fact a leper, and ${user.displayName} died.`,
    `${user.displayName} fell out of a roller coaster while it was doing a loop-de-loop.  ${user.displayName} died upon impact.`,
    `${user.displayName} bled to death after picking at a scab.`,
    `${user.displayName} got told to kill themselves by a cyberbully, and decided to hang themselves out of spite.`,
    `${user.displayName} was beaten to death after cat calling a woman that turned out to be a transgender wrestler.`,
    `${user.displayName} was sent to prison for a minor crime and dropped the soap while in the shower.  ${user.displayName} has died after being anally raped by the entire prison.`,
    `${user.displayName} has died of a horrible disease contracted while visitng a loved one in the hospital.`,
    `${user.displayName} committed suicide after being devastated to find that their Minecraft girlfriend died and respawned in another player's bed.`,
    `${user.displayName} has died of a brain aneurysm.`];
    
    let deathmessage = Math.floor(Math.random() * deaths.length);
    
    try {
      message.channel.send(deaths[deathmessage]);
    } catch (e) {
      console.log(e);
    }
  },
};
