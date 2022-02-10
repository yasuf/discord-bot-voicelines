const prisma = require('../prisma');

class Sound {
  static createSound(data) {
    const { url, name } = data;
    const sound = await prisma.sound.create({
      url,
      name
    });
  }
}

module.exports = Sound;
