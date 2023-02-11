import fs from "fs";

import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { checkLiveGame } from "../query/game_query.js";
import { drawUsingHTML } from "../helpers/pickNumbers.js";
import { CMD_DESC, CMD_NAMES } from "@constants/commands.js";
import { NO_CARDS_YET, NO_GAME_YET } from "@constants/callToActions.js";

const data = new SlashCommandBuilder()
  .setName(CMD_NAMES.VC)
  .setDescription(CMD_DESC.VC);

export default {
  data,
  async execute(interaction: CommandInteraction) {
    try {
      const { guildId, user } = interaction;
      // check if game is live
      const liveGame = await checkLiveGame(guildId);

      if (liveGame) {
        if (!liveGame.playerCards) {
          return interaction.reply(NO_CARDS_YET);
        }

        let playerCards = { ...liveGame.playerCards };
        const playerCARD = playerCards[user.id];

        await interaction.deferReply(); // thinking

        const image = (await drawUsingHTML(playerCARD)) as string;

        const imageName = `./cards/cardMo${user.id}.jpeg`;

        if (fs.existsSync(imageName)) {
          fs.unlinkSync(imageName);
        }

        fs.writeFileSync(imageName, image);

        interaction.channel?.send({
          files: [
            {
              attachment: imageName,
              name: "cardMo.jpeg",
              description: "Card Mo",
            },
          ],
        });

        // fs.unlinkSync(imageName);

        return interaction.followUp(`This is your card. ${user}`);
      }

      return interaction.followUp(NO_GAME_YET);
    } catch (e) {
      console.log("ERROR from view my card, execute", { e });
      return interaction.followUp("Sorry, may mali");
    }
  },
};
