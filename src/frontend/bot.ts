import { Client, GatewayIntentBits, Collection, Message } from "discord.js";

import { Command } from "./command";
import { EventListener } from "./eventListener";
import { CommandFactory } from "./commandFactory";
import { EventListenerFactory } from "./eventListenerFactory";

export class Bot {
  private client: Client;
  private token: string;

  private commands: Collection<string, Command>;
  private eventListeners: Collection<string, EventListener>;

  constructor(token: string) {
    this.token = token;

    // Create a new Discord client
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    // Register all commands
    this.commands = new Collection();
    for (const command of CommandFactory.createCommands()) {
      this.registerCommand(command);
    }

    // Register all event actions
    this.eventListeners = new Collection();
    for (const eventListeners of EventListenerFactory.createEventListeners()) {
      this.registerEventListener(eventListeners);
    }
  }

  // Register a slash command
  registerCommand(command: Command): void {
    this.commands.set(command.name, command);
    this.client.once("ready", async () => {
      try {
        const guilds = this.client.guilds.cache;
        await Promise.all(
          guilds.map((guild) =>
            guild.commands.create(command.getCommandData()),
          ),
        );
        console.log(`Slash command ${command.name} registered.`);
      } catch (error) {
        console.error("Failed to register slash commands:", error);
      }
    });
  }

  // Handle slash commands
  private handleSlashCommands(): void {
    this.client.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;

      const command = this.commands.get(interaction.commandName);
      if (command) {
        try {
          await command.action(interaction);
        } catch (error) {
          console.error("Error handling slash command:", error);
          await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        }
      }
    });
  }

  // Handle legacy commands
  private handleLegacyCommands(): void {
    this.client.on("messageCreate", (msg: Message) => {
      const [command, ...args] = msg.content.split(" ");
      this.commands.get(command)?.action(msg);
    });
  }

  // Register an event action
  registerEventListener(eventListener: EventListener): void {
    this.eventListeners.set(eventListener.name, eventListener);
    this.client.on(eventListener.name, eventListener.action);
    console.log(`EventListener ${eventListener.name} registered.`);
  }

  // Start the bot
  start(): void {
    this.client.once("ready", () => {
      console.log("Bot is online!");
    });

    this.handleLegacyCommands();
    this.handleSlashCommands();

    this.client
      .login(this.token)
      .then(() => "Bot is online!")
      .catch(console.error);
  }
}

export default Bot;
