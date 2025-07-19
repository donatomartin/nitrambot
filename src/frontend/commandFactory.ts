import { Command } from "./command";

import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

export class CommandFactory {
  public static createCommands(): Command[] {
    const commands = [
      new Command("ping", "Replies with Pong!", async (interaction: any) => {
        await interaction.reply("Pong!");
      }),

      new Command("hello", "Replies with Hello!", async (interaction: any) => {
        await interaction.reply("Hello!");
      }),

      new Command(
        "stats",
        "Replies with the current stats",
        async (interaction: any) => {
          await interaction.reply(
            `
            *Bot Stats*:
            Times someone said 'I hate javascript'
            `,
          );
        },
      ),
    ];

    return commands;
  }
}
