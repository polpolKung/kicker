// index.js
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { DateTime } = require("luxon");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ]
});

client.once('ready', () => {
  console.log(`✅ บอทออนไลน์แล้ว: ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "kick") {
    const member = interaction.options.getMember("user");
    const timeStr = interaction.options.getString("time");

    // แยกชั่วโมงกับนาที
    const [h, m] = timeStr.split(":").map(Number);

    // เวลาปัจจุบันใน Asia/Bangkok
    const now = DateTime.now().setZone("Asia/Bangkok");

    // เวลาที่ต้องการ kick ในวันเดียวกัน
    let kickTime = now.set({ hour: h, minute: m, second: 0, millisecond: 0 });

    // ถ้าเวลาที่เลือก <= เวลาปัจจุบัน ให้บวกเพิ่ม 1 วัน
    if (kickTime <= now) {
      kickTime = kickTime.plus({ days: 1 });
    }

    // คำนวณ delay เป็น milliseconds
    const delay = kickTime.diff(now).as("milliseconds");

    await interaction.reply(
      `⏰ จะเตะ ${member.displayName} ออกจาก voice เวลา ${kickTime.toLocaleString(DateTime.TIME_24_SIMPLE)}`
    );

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
