const config = require("../config.json");

module.exports = {
  name: "help",
  description: "Show available commands",

  async execute({ api, event }) {
    const text =
`🤖 ${config.BOT_NAME} HELP

━━━━━━━━━━━━━━
${config.PREFIX}ai <question>
${config.PREFIX}info
${config.PREFIX}help
━━━━━━━━━━━━━━

🧠 Normal কথাবার্তাতেও Tum Dum
smart reply দেওয়ার চেষ্টা করবে।`;

    return api.sendMessage(text, event.threadID);
  }
};