import { Command } from "./command";
import { State } from "./state";

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
${State.getInstance().timesSomeoneSaidIHateJavascript}
`
          );
        }
      ),
    ];

    return commands;
  }
}
