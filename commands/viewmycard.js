import { SlashCommandBuilder, AttachmentBuilder, Client, GatewayIntentBits } from "discord.js";
import { checkLiveGame } from "../query/game_query.js";
import { drawUsingHTML } from "../helpers/pickNumbers.js";


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
        const client = new Client({ intents: [GatewayIntentBits.Guilds] });

        const { guildId, user, channelId } = interaction;
        // check if game is live
        const liveGame = await checkLiveGame(guildId)

        if (liveGame) {

            if (!liveGame.playerCards) {
                return interaction.reply('Wala pang cards ang mga players.')
            }

            let playerCards = { ...liveGame.playerCards }
            const playerCARD = playerCards[user.id]


            const channel = client.channels.cache.get(channelId);

            await interaction.deferReply(); // thinking

            const image = await drawUsingHTML(playerCARD)

            console.log({ image });

            const attachment = new AttachmentBuilder(image, { name: 'bingo.jpeg', description: 'Your Card' });

            console.log({ attachment });

            channel.send({ content: 'Please read me!', files: [{ attachment, name: 'bingo.jpeg', description: 'Your Card' }] });

            console.log('sent?')

            // return interaction.followUp('test')


            return interaction.reply('test')

        }

        return interaction.reply('Wala pang game. Masyado kang excited. type /playbingo to start a game!');

    },
}