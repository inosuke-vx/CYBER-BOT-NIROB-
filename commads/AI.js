module.exports = {
  name: "ai",
  description: "Ask Tum Dum AI",

  async execute({ api, event, args, ai }) {
    const question = args.join(" ").trim();

    if (!question) {
      return api.sendMessage(
        "কী জানতে চাও? 🤔\nউদাহরণ: +ai বাংলাদেশ সম্পর্কে বলো",
        event.threadID
      );
    }

    if (!ai) {
      return api.sendMessage(
        "AI server এখনো connect করা হয়নি। STEP 2-তে AI engine connect হবে। 🧠",
        event.threadID
      );
    }

    const answer = await ai(question, event);

    return api.sendMessage(
      answer || "এই মুহূর্তে উত্তর দিতে পারছি না।",
      event.threadID
    );
  }
};