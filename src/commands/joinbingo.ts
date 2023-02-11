import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { addPlayerToGame } from "../query/game_query.js";
import { CMD_DESC, CMD_NAMES } from "@constants/commands";
import { NO_GAME_YET, YOU_ARE_IN_THE_GAME } from "@constants/callToActions";

const data = new SlashCommandBuilder()
  .setName(CMD_NAMES.JB)
  .setDescription(CMD_DESC.JB)
  .addUserOption((option) =>
    option.setName("player").setDescription("Add other player")
  );

export default {
  data,
  async execute(interaction: CommandInteraction) {
    const { guildId, user } = interaction;

    const player = interaction.options.get("player");

    const gamer = player ? player.user : user;

    const playerId = gamer?.id || "";

    let reply = `Salamat sa pagsali ${gamer}`;

    if (playerId && guildId) {
      const response = await addPlayerToGame({ playerId, channelId: guildId });

      if (response === 0) {
        reply = NO_GAME_YET;
      }

      if (response === 1) {
        reply = YOU_ARE_IN_THE_GAME;
      }

      return interaction.reply(reply);
    }
  },
};
