import { SlashCommandBuilder } from "discord.js";
import { checkLiveGame } from "../query/game_query.js";

const data = new SlashCommandBuilder()
    .setName('listbingoplayers')
    .setDescription('List Bingo Players for current Game')



export default {
    data,
    async execute(interaction) {
        const { channelId } = interaction;
        const game = await checkLiveGame(channelId)


        let reply = 'Wala pang game. Masyado kang excited. type /playbingo to start a game!'

        if (game) {
            const players = await interaction.guild.members.fetch({ user: game.players });

            reply = `
                Players:
                ${players.map(player => player.toString())}
            
            `

            if (!players.size) {
                reply = 'Wala pang player. Sali ka na! type /joinbingo'
            }
        }



        await interaction.reply(reply);
    },
}