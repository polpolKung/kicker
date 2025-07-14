// deploy-commands.js
require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder()
    .setName('kamui')
    .setDescription('ใช้คามุยในเวลาที่กำหนด')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('เลือกคนที่จะ"คามุย"')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('time')
        .setDescription('เวลาที่จะ"คามุย" เช่น 22:00')
        .setRequired(true)),
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('🚀 ลงทะเบียน Slash Command (global)...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log('✅ ลงทะเบียนสำเร็จ! (อาจใช้เวลา 1–60 นาทีให้คำสั่งแสดงผล)');
  } catch (err) {
    console.error('❌ เกิดข้อผิดพลาด:', err);
  }
})();
