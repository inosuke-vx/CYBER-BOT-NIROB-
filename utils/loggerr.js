const time = () => {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone: "Asia/Dhaka"
  });
};

module.exports = {
  info(message) {
    console.log(`[${time()}] [INFO] ${message}`);
  },

  success(message) {
    console.log(`[${time()}] [SUCCESS] ${message}`);
  },

  warn(message) {
    console.log(`[${time()}] [WARN] ${message}`);
  },

  error(message) {
    console.error(`[${time()}] [ERROR] ${message}`);
  }
};