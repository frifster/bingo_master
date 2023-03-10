import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
import dotenv from "dotenv";
import admin, { ServiceAccount } from "firebase-admin";
import _serviceAccount from "../service.json";
import { COMMANDS } from "./commands";
import { ExtendedClient } from "./types";

const serviceAccount = _serviceAccount as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

dotenv.config();

const token = process.env.DISCORD_BOT_TOKEN;

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
}) as ExtendedClient;

client.commands = new Collection();

for (const command of COMMANDS) {
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${command} is missing a required "data" or "execute" property.`
    );
  }
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const client = interaction.client as ExtendedClient;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});
