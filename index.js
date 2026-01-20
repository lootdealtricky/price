const express = require('express');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const app = express();

// --- EXPRESS SERVER (Hostinger ki requirement ke liye) ---
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is Live and Running!');
});

app.listen(PORT, () => {
    console.log(`Express server is listening on port ${PORT}`);
});

// --- TELEGRAM BOT LOGIC ---
const bot = new Telegraf(process.env.BOT_TOKEN);

// Welcome Message
bot.start((ctx) => {
    ctx.reply('Namaste! Main Price Monitor Bot hoon. Mujhe product link bhejein.');
});

// Help Command
bot.help((ctx) => ctx.reply('Mujhe Amazon ya Flipkart ka link bhejein, main price track karunga.'));

// Basic Link Handler (Yahan aap apna purana logic paste kar sakte hain)
bot.on('text', (ctx) => {
    const message = ctx.message.text;
    if (message.includes('amazon') || message.includes('flipkart')) {
        ctx.reply('Link mil gaya! Main iska price check kar raha hoon...');
        // Aapka purana price scraping logic yahan aayega
    } else {
        ctx.reply('Kripya valid shopping link bhejein.');
    }
});

// Error Handling
bot.catch((err, ctx) => {
    console.log(`Error for ${ctx.updateType}`, err);
});

// Bot Launch
bot.launch().then(() => {
    console.log('Telegram Bot started successfully!');
});

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
