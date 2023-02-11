import { SlashCommandBuilder, Interaction } from "discord.js";
import { drawUsingHTML, standardBingoCard } from "../helpers/pickNumbers.js";
import fs from "fs";

const data = new SlashCommandBuilder()
  .setName("generatecard")
  .setDescription("Generate a random bingo card for fun.");

export default {
  data,
  async execute(interaction: Interaction) {
    const { user } = interaction;

    await interaction.deferReply(); // thinking

    const image = await drawUsingHTML(standardBingoCard());

    const imageName = `./cards/cardMoRandom${user.id}.jpeg`;

    if (fs.existsSync(imageName)) {
      fs.unlinkSync(imageName);
    }

    fs.writeFileSync(imageName, image);

    interaction.channel.send({
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
