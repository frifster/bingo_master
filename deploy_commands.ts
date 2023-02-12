import { COMMANDS } from "@commands";
import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
// import { COMMANDS } from "";

dotenv.config();

const clientId = process.env.CLIENT_ID as string;
const guildId = process.env.GUILD_ID as string;
const token = process.env.DISCORD_BOT_TOKEN as string;

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(token);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${COMMANDS.length} application (/) commands.`
    );
    const commandsData = COMMANDS.map((command) => command.data.toJSON());

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = (await rest
      .setToken(token)
      .put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commandsData,
      })) as any[];

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
