import { SlashCommandBuilder } from "discord.js";
import { addPlayerToGame } from "../query/game_query.js";

const data = new SlashCommandBuilder()
  .setName("joinbingo")
  .setDescription("Start playing bingo!!")
  .addUserOption((option) =>
    option.setName("player").setDescription("Add other player")
  );

export default {
  data,
  async execute(interaction) {
    const { guildId, user } = interaction;

    const player = interaction.options.get("player");

    const gamer = player ? player.user : user;

    const playerId = gamer.id;

    const response = await addPlayerToGame({ playerId, channelId: guildId });

    let reply = `Salamat sa pagsali ${gamer.toString()}`;

    if (response === 0) {
      reply =
        "Wala pang game. Masyado kang excited. type /playbingo to start a game!";
    }

    if (response === 1) {
      reply = "Kasali ka na, hinayupak ka!";
    }

    return interaction.reply(reply);
  },
};
