const { Client, GatewayIntentBits, Collection } = require("discord.js");

class Bot {
  constructor(token) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
    this.token = token;
    this.commands = {};
    this.slashCommands = new Collection();
    this.eventActions = {};
  }

  // Register an event listener
  on(eventName, callback) {
    this.eventActions[eventName] = callback;
    this.client.on(eventName, callback);
  }

  // Register a message event listener
  onMessage() {
    this.client.on("messageCreate", (msg) => {
      const [command, ...args] = msg.content.split(" ");

      if (this.eventActions["messageCreate"]) {
        this.eventActions["messageCreate"](msg);
      }

      if (this.commands[command]) {
        this.commands[command](msg, args);
      }
    });
  }

  // Register a prefix-based command
  command(commandName, callback) {
    this.commands[commandName] = callback;
  }

  // Register multiple prefix-based commands
  addCommands(commands) {
    commands.forEach(([commandName, callback]) => {
      this.command(commandName, callback);
    });
  }

  // Register a slash command
  slashCommand(commandData, callback) {
    this.slashCommands.set(commandData.name, callback);
    this.client.once("ready", async () => {
      try {
        const guilds = this.client.guilds.cache;
        await Promise.all(
          guilds.map((guild) => guild.commands.create(commandData))
        );
        console.log(`Slash command ${commandData.name} registered.`);
      } catch (error) {
        console.error("Failed to register slash commands:", error);
      }
    });
  }

  // Register multiple slash commands
  addSlashCommands(commands) {
    commands.forEach(([name, description, callback]) => {
      this.slashCommand({ name, description }, callback);
    });
  }

  // Register application commands
  applicationCommand() {
    
  }

  // Handle interactions
  onInteraction() {
    this.client.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;

      const command = this.slashCommands.get(interaction.commandName);
      if (command) {
        try {
          await command(interaction);
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

  // Start the bot
  start() {
    this.onMessage();
    this.onInteraction();
    this.client
      .login(this.token)
      .then(() => console.log("Bot is online!"))
      .catch(console.error);
  }
}

module.exports = Bot;
