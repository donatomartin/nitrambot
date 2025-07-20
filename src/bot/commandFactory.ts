import { Service } from "../service";
import { ApplicationCommandOptionType } from "discord.js";

type CommandCallback = (interaction: any) => Promise<void>;

export class Command {
  public name: string;
  public description: string;
  public action: CommandCallback;
  public options?: any;

  constructor(name: string, description: string, action: any, options?: any) {
    this.name = name;
    this.description = description;
    this.action = action;
    this.options = options;
  }

  public getCommandData() {
    return {
      name: this.name,
      description: this.description,
      options: this.options || [],
    };
  }
}

export class CommandFactory {
  public static createCommands(service: Service): Command[] {
    const commands = [
      new Command("ping", "Replies with Pong!", async (interaction: any) => {
        await interaction.reply("Pong!");
      }),

      new Command("hello", "Replies with Hello!", async (interaction: any) => {
        await interaction.reply("Hello!");
      }),

      new Command(
        "keywords",
        "Replies with the current keywords",
        async (interaction: any) => {
          service.findKeywords().then((res) => {
            const keywords: string[] = res.map(
              (keyword: any) => keyword.keyword,
            );
            interaction.reply(
              `**Current Keywords**:\n${keywords.join("\n")}
            `,
            );
          });
        },
      ),

      new Command(
        "stats",
        "Replies with the current stats",
        async (interaction: any) => {
          const keyword = interaction.options.getString("keyword");
          const username = interaction.options.getString("username");
          const filter = {
            keyword,
            ...(username && { username: username.toLowerCase() }),
          };
          service.findKeywordUse(filter).then((res) => {
            interaction.reply(
              `**Stats for ${keyword}**:\n${res.length} uses of the word` +
                (username ? ` by ${username}` : ""),
            );
          });
        },
        [
          {
            name: "keyword",
            description: "The keyword to track",
            type: ApplicationCommandOptionType.String,
            required: true,
          },
          {
            name: "username",
            description: "The username to track",
            type: ApplicationCommandOptionType.String,
            required: false,
          },
        ],
      ),

      new Command(
        "addkeyword",
        "Adds a new keyword",
        async (interaction: any) => {
          const keyword = interaction.options.getString("keyword");
          if (!keyword) {
            await interaction.reply({
              content: "Please provide a keyword to add.",
              ephemeral: true,
            });
            return;
          }

          try {
            const result = await service.addKeyword({ keyword });
            await interaction.reply({
              content: `Keyword "${result.keyword}" added successfully!`,
              ephemeral: true,
            });
          } catch (error: any) {
            await interaction.reply({
              content: `Error adding keyword: ${error.message}`,
              ephemeral: true,
            });
          }
        },
        [
          {
            name: "keyword",
            description: "The keyword to add",
            type: ApplicationCommandOptionType.String,
            required: true,
          },
        ],
      ),
    ];

    return commands;
  }
}
