// index.js
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ]
});

client.once('ready', () => {
  console.log(`✅ บอทออนไลน์แล้ว: ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'kick') {
    const member = interaction.options.getMember('user');
    const timeStr = interaction.options.getString('time');

    // แปลงเวลา
    const now = new Date();
    const [h, m] = timeStr.split(':').map(Number);
    const kickTime = new Date();
    kickTime.setHours(h, m, 0, 0);
    if (kickTime <= now) kickTime.setDate(kickTime.getDate() + 1);
    const delay = kickTime - now;

    await interaction.reply(`⏰ จะเตะ ${member.displayName} ออกจาก voice เวลา ${kickTime.toLocaleTimeString()}`);

    setTimeout(async () => {
      if (member.voice?.channel) {
        await member.voice.disconnect();
        interaction.followUp(`✅ เตะ ${member.displayName} ออกจากห้องเสียงแล้ว`);
      } else {
        interaction.followUp(`❌ ${member.displayName} ไม่ได้อยู่ใน voice channel`);
      }
    }, delay);
  }
});

const keepAlive = require('./keep_alive');
keepAlive();

client.login(process.env.DISCORD_TOKEN);
