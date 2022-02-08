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
    this.lakadMatatag = createAudioResource(join(__dirname, 'sounds', 'lakadmatatag.mp3'));
  }

  playEffect() {
    this.player.play(this.lakadMatatag, { inputType: StreamType.Arbitrary });
    return entersState(connection, VoiceConnectionStatus.Ready, 30e3);
  }

  async connectToChannel(channel) {
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
}


module.exports = Voice;
