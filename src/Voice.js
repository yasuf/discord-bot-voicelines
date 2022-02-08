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
  static player = createAudioPlayer();
  static lakadMatatag = createAudioResource(join(__dirname, 'sounds', 'lakadmatatag.mp3'));

  constructor() {

  }


}


module.exports = Voice;
