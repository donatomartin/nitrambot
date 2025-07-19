import { Bot } from "./frontend/bot";
import * as express from "express";
import mongoose from "mongoose";

import { KeywordRepository } from "./repositories/keywordsRepository";
import { KeywordsService } from "./services/keywordsService";
import { KeywordsController } from "./controllers/keywordsController";

const app: express.Application = express();
app.use(express.json());
const port = 8000;

const mongouri = process.env.MONGODB_URI as string;
mongoose.connect(mongouri);

const keywordRepository = new KeywordRepository(mongoose, mongouri);
const keywordsService = new KeywordsService(keywordRepository);
new KeywordsController(app, keywordsService);

// bot.ts
const botToken = process.env.DISCORD_TOKEN as string;
const bot = new Bot(botToken);

// Start the bot
bot.start();

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
server.on("close", () => {
  mongoose.connection.close();
});
