import * as dotenv from "dotenv";
dotenv.config();
import { Bot } from "./bot.js";

// bot.ts
const bot = new Bot(process.env.DISCORD_TOKEN as string);

// Start the bot
bot.start();
