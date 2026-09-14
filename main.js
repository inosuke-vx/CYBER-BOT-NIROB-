require("dotenv").config();

const express = require("express");
const fs = require("fs");
const path = require("path");

const config = require("./config.json");
const logger = require("./utils/logger");
const {
  loadCommands
} = require("./core/commandHandler");
const {
  handleMessage
} = require("./core/messageHandler");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    bot: config.BOT_NAME,
    owner: config.OWNER_NAME,
    status: "online",
    version: "1.0.0"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    bot: config.BOT_NAME,
    time: new Date().toISOString()
  });
});

const PORT =
  process.env.PORT ||
  config.PORT ||
  8080;

app.listen(PORT, () => {
  logger.success(
    `${config.BOT_NAME} server running on port ${PORT}`
  );
});

loadCommands();

logger.success(
  `${config.BOT_NAME} core initialized`
);

logger.info(
  "AI engine will be connected in STEP 2."
);

logger.info(
  "Messenger listener will be connected after the new listener layer is ready."
);