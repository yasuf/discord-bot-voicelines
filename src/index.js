const Discord = require('discord.js');
const config = require('../config.json');
const { join } = require('path');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] });
const Voice = require('./Voice');
const CommandParser = require('./CommandParser');

const voiceClient = new Voice();

client.on("messageCreate", async function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(CommandParser.PREFIX)) return;

  const parser = new CommandParser();
  const { args, command } = parser.parse(message);

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  } else if (command === "lakadmatatag") {
    voiceClient.playEffect();
    message.reply(`Playing Lakad Matatag`);
  } else if (command === "join") {
    console.log('trying to join');
    const channel = message.member.voice.channel;
    const connection = await voiceClient.connectToChannel(channel);
    connection.subscribe(player);
  }
});

client.login(config.BOT_TOKEN);
console.log("Sucessfully logged in to the Discord Lines bot")
