import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { checkLiveGame, updatePlayerCards } from "../query/game_query.js";
import { pickNumbers, standardBingoCard } from "../helpers/pickNumbers.js";
import { NO_GAME_YET, STARTING_GAME } from "@constants/callToActions.js";
import { CMD_DESC, CMD_NAMES } from "@constants/commands.js";

const data = new SlashCommandBuilder()
  .setName(CMD_NAMES.SB)
  .setDescription(CMD_DESC.SB);

export default {
  data,
  async execute(interaction: CommandInteraction) {
    const { guildId } = interaction;
    // check if game is live
    const liveGame = await checkLiveGame(guildId);

    if (liveGame) {
      // start the game.
      const numberSequence = pickNumbers();

      let playerCards = liveGame.playerCards || {};

      liveGame.players.forEach((player) => {
        playerCards[player] = playerCards[player] || standardBingoCard();
      });

      await updatePlayerCards({ playerCards, gameId: liveGame.id });

      return interaction.reply(STARTING_GAME);
    }

    return interaction.reply(NO_GAME_YET);
  },
};
