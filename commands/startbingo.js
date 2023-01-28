import { SlashCommandBuilder } from "discord.js";
import { checkLiveGame, updatePlayerCards } from "../query/game_query.js";
import { pickNumbers, standardBingoCard } from "../helpers/pickNumbers.js";

const data = new SlashCommandBuilder()
    .setName('startbingo')
    .setDescription('Start playing bingo!!')



export default {
    data,
    async execute(interaction) {
        const { guildId } = interaction;
        // check if game is live
        const liveGame = await checkLiveGame(guildId)

        if (liveGame) {
            // start the game.
            const numberSequence = pickNumbers();

            let playerCards = liveGame.playerCards || {}

            liveGame.players.forEach(player => {
                playerCards[player] = playerCards[player] || standardBingoCard();
            })

            await updatePlayerCards({ playerCards, gameId: liveGame.id });

            return interaction.reply('Game in progress!')

        }

        return interaction.reply('Wala pang game. Masyado kang excited. type /playbingo to start a game!');

    },
}