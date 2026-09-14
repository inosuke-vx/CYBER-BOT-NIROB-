const config = require("../config.json");

module.exports = {
  name: "info",
  description: "Tum Dum bot information",

  async execute({ api, event }) {
    const text =
`🤖 ${config.BOT_NAME}

━━━━━━━━━━━━━━
👑 Owner: ${config.OWNER_NAME}
⚡ Version: 1.0.0
🧠 AI System: Enabled
💬 Smart Reply: Enabled
💾 Memory: Enabled
🌐 Language: Bangla
━━━━━━━━━━━━━━`;

    return api.sendMessage(text, event.threadID);
  }
};