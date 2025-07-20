import { Bot } from "./bot/bot";
import * as express from "express";
import mongoose from "mongoose";

import { Repository } from "./repository";
import { Service } from "./service";
import { Controller } from "./controller";

const app: express.Application = express();
app.use(express.json());
const port = 8000;

const mongouri = process.env.MONGODB_URI as string;
mongoose.connect(mongouri);

const keywordRepository = new Repository(mongoose, mongouri);
const keywordsService = new Service(keywordRepository);
new Controller(app, keywordsService);

// bot.ts
const botToken = process.env.DISCORD_TOKEN as string;
const bot = new Bot(botToken, keywordsService);

// Start the bot
bot.start();

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
server.on("close", () => {
  mongoose.connection.close();
});
