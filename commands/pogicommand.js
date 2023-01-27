import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('testbingo')
        .setDescription('test command'),
    async execute(interaction) {
        await interaction.reply('Ang pogi ni Angelo Agravante! - /testing connection');
    },
}