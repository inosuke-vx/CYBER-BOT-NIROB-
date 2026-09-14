const config = require("../config.json");
const { canReply } = require("../utils/cooldown");
const { generateReply } = require("./responseEngine");
const memory = require("../database/memory");
const logger = require("../utils/logger");
const {
  handleCommand
} = require("./commandHandler");

async function handleMessage(api, event, ai) {
  if (!event || !event.body) return;

  const body = String(event.body).trim();

  if (!body) return;

  if (
    api.getCurrentUserID &&
    event.senderID === api.getCurrentUserID()
  ) {
    return;
  }

  const threadID = event.threadID;
  const userID = event.senderID;

  const user = memory.getUser(userID);

  memory.updateUser(userID, {
    messages: (user.messages || 0) + 1
  });

  const prefix = config.PREFIX;

  if (body.startsWith(prefix)) {
    const content = body.slice(prefix.length).trim();

    if (!content) return;

    const parts = content.split(/\s+/);
    const commandName = parts.shift();

    const handled = await handleCommand({
      api,
      event,
      commandName,
      args: parts,
      ai
    });

    if (handled) return;
  }

  if (!config.AUTO_REPLY) return;

  if (!canReply(
    `${threadID}:${userID}`,
    config.COOLDOWN
  )) {
    return;
  }

  memory.addConversation(
    threadID,
    "user",
    body
  );

  try {
    let reply = null;

    if (ai) {
      reply = await ai(body, {
        ...event,
        user
      });
    }

    if (!reply) {
      reply = await generateReply(body);
    }

    if (!reply) return;

    memory.addConversation(
      threadID,
      "assistant",
      reply
    );

    await api.sendMessage(
      reply,
      threadID
    );
  } catch (error) {
    logger.error(
      `Message error: ${error.message}`
    );
  }
}

module.exports = {
  handleMessage
};