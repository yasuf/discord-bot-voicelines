class CommandParser {

  static PREFIX = "!";

  constructor() {}

  parse(message) {
    const commandBody = message.content.slice(CommandParser.PREFIX.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();

    return {
      args,
      command,
    }
  }
}

module.exports = CommandParser;
