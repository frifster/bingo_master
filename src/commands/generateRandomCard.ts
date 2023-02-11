import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { drawUsingHTML, standardBingoCard } from "../helpers/pickNumbers.js";
import fs from "fs";
import { CMD_NAMES, CMD_DESC } from "../constants/commands.js";

const data = new SlashCommandBuilder()
  .setName(CMD_NAMES.GC)
  .setDescription(CMD_DESC.GC);

export default {
  data,
  async execute(interaction: CommandInteraction) {
    const { user } = interaction;

    await interaction.deferReply(); // thinking

    const image = (await drawUsingHTML(standardBingoCard())) as string;

    const imageName = `./cards/cardMoRandom${user.id}.jpeg`;

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

    return interaction.followUp(`This is your random generated card. ${user}`);
  },
};
