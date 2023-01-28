import { SlashCommandBuilder, AttachmentBuilder } from "discord.js";
import { checkLiveGame } from "../query/game_query.js";
import { drawUsingHTML } from "../helpers/pickNumbers.js";
import fs from 'fs';


const data = new SlashCommandBuilder()
    .setName('viewmycard')
    .setDescription('View your card for the current game!')


export default {
    data,
    async execute(interaction) {
        try {
            const { guildId, user } = interaction;
            // check if game is live
            const liveGame = await checkLiveGame(guildId)

            if (liveGame) {

                if (!liveGame.playerCards) {
                    return interaction.reply('Wala pang cards ang mga players.')
                }

                let playerCards = { ...liveGame.playerCards }
                const playerCARD = playerCards[user.id]

                await interaction.deferReply(); // thinking

                const image = await drawUsingHTML(playerCARD)

                const imageName = `./cards/cardMo${user.id}.jpeg`;

                if (fs.existsSync(imageName)) {
                    fs.unlinkSync(imageName)
                }

                fs.writeFileSync(imageName, image)

                interaction.channel.send({
                    files: [{
                        attachment: imageName,
                        name: 'cardMo.jpeg',
                        description: 'Card Mo'
                    }]
                })

                // fs.unlinkSync(imageName);

                return interaction.followUp('TEST FOLLOW UP!')

            }

            return interaction.followUp('Wala pang game. Masyado kang excited. type /playbingo to start a game!');
        } catch (e) {
            console.log('ERROR from view my card, execute', { e });
            return interaction.followUp('Sorry, may mali')
        }

    },
}