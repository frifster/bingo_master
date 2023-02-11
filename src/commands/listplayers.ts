import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { checkLiveGame } from "../query/game_query.js";
import { NO_PLAYERS_YET } from "@constants/callToActions.js";
import { CMD_DESC, CMD_NAMES } from "@constants/commands.js";

const data = new SlashCommandBuilder()
  .setName(CMD_NAMES.LB)
  .setDescription(CMD_DESC.LB);

export default {
  data,
  async execute(interaction: CommandInteraction) {
    const { guildId } = interaction;
    const game = await checkLiveGame(guildId);

    let reply =
      "Wala pang game. Masyado kang excited. type /playbingo to start a game!";

    if (game) {
      const players = await interaction.guild?.members.fetch({
        user: game.players,
      });

      if (players) {
        reply = `\nPlayers:${players.map(
          (player) => `\n${player.toString()}`
        )}`;

        if (!players.size) {
          reply = NO_PLAYERS_YET;
        }
      }
    }

    await interaction.reply(reply);
  },
};
