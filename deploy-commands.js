// deploy-commands.js
require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder()
    .setName('kick')
    .setDescription('เตะผู้ใช้จาก voice channel ตามเวลาที่กำหนด')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('เลือกผู้ใช้')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('time')
        .setDescription('เวลาที่จะเตะ เช่น 22:00')
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
