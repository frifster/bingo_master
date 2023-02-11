import { SlashCommandBuilder, Interaction } from "discord.js";
import { checkLiveGame } from "../query/game_query.js";

const data = new SlashCommandBuilder()
  .setName("listbingoplayers")
  .setDescription("List Bingo Players for current Game");

export default {
  data,
  async execute(interaction: Interaction) {
    const { guildId } = interaction;
    const game = await checkLiveGame(guildId);

    let reply =
      "Wala pang game. Masyado kang excited. type /playbingo to start a game!";

    if (game) {
      const players = await interaction.guild?.members.fetch({
        user: game.players,
      });

      reply = `\nPlayers:${players.map((player) => `\n${player.toString()}`)}`;

      if (!players.size) {
        reply = "Wala pang player. Sali ka na! type /joinbingo";
      }
    }

    await interaction.reply(reply);
  },
};
