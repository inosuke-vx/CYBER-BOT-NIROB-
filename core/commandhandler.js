const fs = require("fs");
const path = require("path");
const logger = require("../utils/logger");

const commands = new Map();

function loadCommands() {
  const directory = path.join(__dirname, "..", "commands");

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  for (const file of fs.readdirSync(directory)) {
    if (!file.endsWith(".js")) continue;

    try {
      const command = require(path.join(directory, file));

      if (!command.name || typeof command.execute !== "function") {
        continue;
      }

      commands.set(command.name.toLowerCase(), command);
      logger.success(`Command loaded: ${command.name}`);
    } catch (error) {
      logger.error(`Failed loading ${file}: ${error.message}`);
    }
  }

  return commands;
}

async function handleCommand(context) {
  const {
    api,
    event,
    commandName,
    args,
    ai
  } = context;

  const command = commands.get(commandName.toLowerCase());

  if (!command) return false;

  try {
    await command.execute({
      api,
      event,
      args,
      ai
    });

    return true;
  } catch (error) {
    logger.error(
      `Command ${commandName}: ${error.message}`
    );

    await api.sendMessage(
      "দুঃখিত, command চালাতে সমস্যা হয়েছে।",
      event.threadID
    );

    return true;
  }
}

module.exports = {
  commands,
  loadCommands,
  handleCommand
};