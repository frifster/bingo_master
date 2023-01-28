import { SlashCommandBuilder, AttachmentBuilder } from "discord.js";
import { checkLiveGame } from "../query/game_query.js";
import { drawUsingHTML } from "../helpers/pickNumbers.js";
import { client } from "../index.js";

const data = new SlashCommandBuilder()
    .setName('viewmycard')
    .setDescription('View your card for the current game!')


const sendImage = async (client, buffer, channelId) => {
    const channel = client.channels.cache.get(channelId);
    await channel.send('Here is your BINGO card:', {
        files: [{
            attachment: buffer,
            name: 'bingo-card.png'
        }]
    });
};



export default {
    data,
    async execute(interaction) {
        const { guildId, user, channelId } = interaction;
        // check if game is live
        const liveGame = await checkLiveGame(guildId)

        if (liveGame) {

            if (!liveGame.playerCards) {
                return interaction.reply('Wala pang cards ang mga players.')
            }

            let playerCards = { ...liveGame.playerCards }
            const playerCARD = playerCards[user.id]

            // const embed = new EmbedBuilder()
            //     .setTitle("BINGO")

            // for (const key in playerCARD) {
            //     const numbers = playerCARD[key].join(',');
            //     embed.addFields({ name: key, value: numbers });
            // }
            // embed.setColor("#ff0000");

            const channel = client.channels.cache.get(channelId);

            await interaction.deferReply();

            const image = await drawUsingHTML(playerCARD)
            const attachment = new AttachmentBuilder(image);

            channel.send({ content: 'Please read me!', files: [{ attachment, name: 'bingo.jpeg', description: 'Your Card' }] });

            return interaction.editReply('test')


            // return interaction.reply('test')

        }

        return interaction.reply('Wala pang game. Masyado kang excited. type /playbingo to start a game!');

    },
}