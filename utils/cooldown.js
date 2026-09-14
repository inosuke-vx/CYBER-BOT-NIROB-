const cooldowns = new Map();

function canReply(key, cooldown = 1200) {
  const now = Date.now();
  const last = cooldowns.get(key) || 0;

  if (now - last < cooldown) {
    return false;
  }

  cooldowns.set(key, now);
  return true;
}

function clearCooldown(key) {
  cooldowns.delete(key);
}

module.exports = {
  canReply,
  clearCooldown
};