const Discord = require('discord.js');
const { join } = require('path');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] });
const Voice = require('./Voice');
const CommandParser = require('./CommandParser');

const voiceClients = {};

async function joinChannel(channel, voiceClient) {
  if (!channel) { return false };
  connection = await voiceClient.connectToChannel(channel);
  connection.subscribe(voiceClient.player);
  return connection;
}

client.on("messageCreate", async function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(CommandParser.PREFIX)) return;

  const memberGuildId = message.member.guild.id;
  const parser = new CommandParser();
  const { args, command } = parser.parse(message);
  let voiceClient;

  if (!voiceClients[memberGuildId]) {
    voiceClients[memberGuildId] = new Voice();
  }

  voiceClient = voiceClients[memberGuildId];

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  } else if (command === "join") {
    const channel = message.member.voice.channel;
    joinChannel(channel, voiceClient);
  } else if (command === "stop") {
    voiceClient.stopEffect();
    message.reply(`Stopping Voice message`);
  } else if (command === "sfx") {
    const channel = message.member.voice.channel;
    joinChannel(channel, voiceClient);
    voiceClient.playPathEffect(args);
    message.reply(`Playing sound effect ${args}`);
  } else if (command === "list") {
    message.reply(`List of commands available:`);
    const soundsList = await voiceClient.availableSounds();
    const list = soundsList.reduce((acc, sound) => {
      return acc + '\n' + sound.replace('.mp3', '');
    }, '');
    message.reply(list);
  }
});

const token = process.env['BOT_TOKEN'];

client.login(token);
console.log("Sucessfully logged in to the Discord Lines bot")
