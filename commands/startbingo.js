import { SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
    .setName('startbingo')
    .setDescription('Start playing bingo!!')



export default {
    data,
    async execute(interaction) {
        let reply = 'Kasali ka na, hinayupak ka!'
        await interaction.reply(reply);
    },
}