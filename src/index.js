const Discord = require('discord.js');
const { join } = require('path');
require('dotenv').config();

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] });
const Voice = require('./Voice');
const CommandParser = require('./CommandParser');
const { getLines, getLineByName } = require('./helpers/LinesClient');

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
    console.log(`memberGuildId: ${memberGuildId}`);
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
    message.reply(`Stopping voice line`);
  } else if (command === "s") {
    const file = args.pop();
    const channel = message.member.voice.channel;
    joinChannel(channel, voiceClient);

    try {
      const line = await getLineByName(file);

      const fileUrl = `${process.env.LINES_API_URL}${line.data.audioFile.url}`;
      voiceClient.play(fileUrl);

      message.reply(`Playing voice line: ${line.data.name}`);
    } catch (e) {
      message.reply(`Voice line does not exist: ${file}`);
      console.error(e);
    }
  } else if (command === "list") {
    const linesPayload = await getLines();
    const lines = linesPayload.data.data
    const list = lines.reduce((acc, line) => {
      return acc + '\n' + line.attributes.name.toLowerCase();
    }, '');
    message.reply(list);
  }
});

const token = process.env['BOT_TOKEN'];

client.login(token);
console.log("Sucessfully logged in to the Discord Lines bot")
