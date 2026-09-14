const fs = require("fs-extra");
const path = require("path");

const file = path.join(__dirname, "memory.json");

if (!fs.existsSync(file)) {
  fs.writeJsonSync(file, {
    users: {},
    groups: {},
    conversations: {}
  }, { spaces: 2 });
}

function load() {
  try {
    return fs.readJsonSync(file);
  } catch {
    return {
      users: {},
      groups: {},
      conversations: {}
    };
  }
}

function save(data) {
  fs.writeJsonSync(file, data, { spaces: 2 });
}

function getUser(userID) {
  const data = load();

  if (!data.users[userID]) {
    data.users[userID] = {
      id: userID,
      name: "",
      messages: 0,
      createdAt: Date.now()
    };

    save(data);
  }

  return data.users[userID];
}

function updateUser(userID, updates) {
  const data = load();

  if (!data.users[userID]) {
    data.users[userID] = {
      id: userID,
      name: "",
      messages: 0,
      createdAt: Date.now()
    };
  }

  data.users[userID] = {
    ...data.users[userID],
    ...updates
  };

  save(data);

  return data.users[userID];
}

function getConversation(threadID) {
  const data = load();

  if (!data.conversations[threadID]) {
    data.conversations[threadID] = [];
    save(data);
  }

  return data.conversations[threadID];
}

function addConversation(threadID, role, content) {
  const data = load();

  if (!data.conversations[threadID]) {
    data.conversations[threadID] = [];
  }

  data.conversations[threadID].push({
    role,
    content,
    time: Date.now()
  });

  if (data.conversations[threadID].length > 30) {
    data.conversations[threadID] =
      data.conversations[threadID].slice(-30);
  }

  save(data);
}

module.exports = {
  load,
  save,
  getUser,
  updateUser,
  getConversation,
  addConversation
};