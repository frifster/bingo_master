import { SlashCommandBuilder } from "discord.js";
import { BINGO_PATTERNS } from "../constants/bingoPatterns.js";
import { checkLiveGame, createGame } from "../query/game_query.js";

const data = new SlashCommandBuilder()
  .setName("playbingo")
  .setDescription("Start playing bingo!!")
  .addStringOption((option) =>
    option
      .setName("random")
      .setDescription('Answer with "Yes" or "No"')
      .addChoices({ name: "Yes", value: "yes" }, { name: "No", value: "no" })
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("pattern")
      .setDescription("Bingo Pattern to Play")
      .addChoices(...BINGO_PATTERNS)
      .setRequired(true)
  );

export default {
  data,
  async execute(interaction) {
    // check live game first
    try {
      const { guildId, user } = interaction;

      const game = await checkLiveGame(guildId);

      if (game) {
        return interaction.reply("May game na! Wag ka na gumawa!");
      }

      const random = interaction.options.get("random");
      const pattern = interaction.options.get("pattern");
      const memberId = user.id;
      const patternName = BINGO_PATTERNS.find(
        (bp) => bp.value === pattern.value
      ).name;

      await createGame({
        channelId: guildId,
        memberId,
        players: [],
        patternName,
        patternValue: pattern.value,
      });

      let reply = "";

      if (random.value === "yes") {
        reply = `You are playing with random digital cards issued by me. The pattern is ${patternName}. Please wait while we setup the game! type /joinbingo to join the game`;
      } else {
        reply = `You are playing with physical cards.The pattern is ${patternName}. Please wait while we setup the game! type /joinbingo to join the game`;
      }

      await interaction.reply(reply);
    } catch (e) {
      console.log("There is an error!", { e });
      return interaction.reply("Sorry there was an error.");
    }
  },
};
