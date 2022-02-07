const Discord = require('discord.js');
const config = require('./config.json');
const { join } = require('path');
const {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  entersState,
  StreamType,
  VoiceConnectionStatus
} = require('@discordjs/voice');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] });
const player = createAudioPlayer();
const resource = createAudioResource(join(__dirname, 'sounds', 'lakadmatatag.mp3'));

const PREFIX = "!";

async function connectToChannel(channel) {
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    try {
      await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
      return connection;
    } catch (error) {
      connection.destroy();
      throw error;
    }
}

client.on("messageCreate", async function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const commandBody = message.content.slice(PREFIX.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  } else if (command === "sum") {
    const numArgs = args.map(x => parseFloat(x));
    const sum = numArgs.reduce((acc, el) => acc + el, 0);

    message.reply(`The sum of all arguments provided is ${sum}!`);
  } else if (command === "lakadmatatag") {
    console.log(resource);
    player.play(resource, { inputType: StreamType.Arbitrary });

    message.reply(`Playing Lakad Matatag`);
  } else if (command === "join") {
    const channel = message.member.voice.channel;
    const connection = await connectToChannel(channel);
    connection.subscribe(player);
  } else if (command === "kick") {

  }
});

client.login(config.BOT_TOKEN);
console.log("Sucessfully logged in to the Discord Lines bot")
