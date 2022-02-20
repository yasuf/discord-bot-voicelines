const { readdir } = require('fs/promises');
const { join } = require('path');
const {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  entersState,
  StreamType,
  VoiceConnectionStatus,
  AudioPlayerStatus,
} = require('@discordjs/voice');
class Voice {
  constructor() {
    this.player = createAudioPlayer();
    this.connection = null;
    this.channel = null;
  }

  playPathEffect(args) {
    const file = args.pop();
    const folders = args;
    const resource = createAudioResource(join(__dirname, 'sounds', ...folders, `${file}.mp3`));
    this.player.play(resource, { inputType: StreamType.Arbitrary });
  }

  play(url) {
    try {
      const resource = createAudioResource(url);
      this.player.play(resource, { inputType: StreamType.Arbitrary });
    } catch (e) {
      console.error(`Could not play file in url ${url}, full error:`);
      console.error(e);
    }
  }

  stopEffect() {
    this.player.stop();
  }

  async connectToChannel(channel) {
    this.connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    try {
      await entersState(this.connection, VoiceConnectionStatus.Ready, 30e3);
      return this.connection;
    } catch (error) {
      this.connection.destroy();
      throw error;
    }
  }

  async availableSounds() {
    const files = await readdir(join(__dirname, 'sounds'));
    return files;
  }
}


module.exports = Voice;
