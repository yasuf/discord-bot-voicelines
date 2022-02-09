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
  }

  playPathEffect(args) {
    const file = args.pop();
    const folders = args;
    const resource = createAudioResource(join(__dirname, 'sounds', ...folders, `${file}.mp3`));
    this.player.play(resource, { inputType: StreamType.Arbitrary });
  }

  stopEffect() {
    this.player.stop();
  }

  async connectToChannel(channel) {
    if (!channel) {
      return false;
    }

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
}


module.exports = Voice;
