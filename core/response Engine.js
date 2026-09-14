const config = require("../config.json");

const greetings = [
  "আসসালামু আলাইকুম ❤️",
  "ওয়ালাইকুমুস সালাম 🫶",
  "হ্যাঁ, বলো 😌",
  "জি, Tum Dum এখানে আছি 😎",
  "কী খবর? 😄"
];

function random(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clean(text) {
  return String(text || "")
    .trim()
    .replace(/\s+/g, " ");
}

async function generateLocalReply(message) {
  const text = clean(message).toLowerCase();

  if (!text) return null;

  if (
    text.includes("সালাম") ||
    text.includes("assalamu") ||
    text.includes("as-salamu")
  ) {
    return random([
      "ওয়ালাইকুমুস সালাম ❤️",
      "ওয়ালাইকুমুস সালাম 🫶 কেমন আছো?",
      "ওয়ালাইকুমুস সালাম 🌸 Tum Dum হাজির।"
    ]);
  }

  if (
    text === "hi" ||
    text === "hello" ||
    text === "hey" ||
    text.includes("হাই")
  ) {
    return random(greetings);
  }

  if (
    text.includes("তোমার নাম") ||
    text.includes("তুই কে") ||
    text.includes("তুমি কে")
  ) {
    return `আমি ${config.BOT_NAME} 🤖\nআমার owner ${config.OWNER_NAME}।`;
  }

  if (
    text.includes("কেমন আছ") ||
    text.includes("কেমন আছো")
  ) {
    return random([
      "আমি একদম ভালো আছি 😎 তুমি কেমন আছো?",
      "Tum Dum ভালোই আছে 😌 তোমার খবর কী?",
      "ভালো আছি 🫶 তোমার সাথে কথা বলছি তো!"
    ]);
  }

  if (
    text.includes("ধন্যবাদ") ||
    text.includes("thanks") ||
    text.includes("thank you")
  ) {
    return random([
      "এত formal হওয়ার দরকার নেই 😌",
      "Welcome 🫶",
      "আরে সমস্যা নেই ভাই ❤️"
    ]);
  }

  return null;
}

async function generateReply(message) {
  return generateLocalReply(message);
}

module.exports = {
  generateReply
};