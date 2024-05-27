const http = require('http');
const express = require('express');
const app = express();

// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve the HTML file on the root route
app.get("/", (request, response) => {
  response.sendFile('web.html', { root: __dirname });
});

// Start the server on the specified port
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

// Keep the app alive by pinging itself every 280 seconds
setInterval(() => {
  http.get(`http://Name-Project.glitch.me/`);
}, 280000);

let interval;
let isEnabled = false;

const { Client, Disprocesscord, Discord, RichPresence } = require('discord.js-selfbot-v13');
const client = new Client({
  readyStatus: false,
  checkUpdate: false
});
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

client.once('ready', () => {

  console.log(`Logged in as ${client.user.tag}!`);
  const startDate = new Date();
  const formattedDate = startDate.toLocaleString();

const a1881 = new RichPresence()

.setApplicationId(`1179783460135649392`)

.setType(`PLAYING`)

.setName(`PojavLauncher`)

.setState(`Now Playing At ${formattedDate}`)

.setAssetsLargeImage('https://cdn.discordapp.com/avatars/1179783460135649392/341a716622e9b45f70f76ada1076ae9c.webp?size=2048')

client.user.setActivity(a1881)
  });
  
client.login(process.env.t);


const channelId = process.env.id;
const ownerId = process.env.owner;
const spam = process.env.spam;

client.on('messageCreate', async (message) => {
  // Check if the message author is the owner
  if (message.author.id !== ownerId) {
    return 1;
  }

  if (message.content === '=jo') {
    try {
      const channel = await client.channels.fetch(channelId);
      if (channel.isVoice()) {
        const connection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator
        });
        console.log('join')
        message.react('✅')
      } else {
        
      }
    } catch (error) {
      console.error('Error joining voice channel:', error);
      
    }
  }

  if (message.content === '=lev') {
    try {
      const connection = getVoiceConnection(message.guild.id);
      if (connection) {
        connection.destroy();
        console.log('leave')
        message.react('✅')
      } else {
        
      }
    } catch (error) {
      console.error('Error leaving voice channel:', error);
      
    }
  }
});

client.on('messageCreate', async (message) => {
  // Only allow the owner to use these commands
  if (message.author.id !== ownerId) {
    return;
  }

  if (message.content === '=on' && !isEnabled) {
    let channel = client.channels.cache.get(spam);
    if (!channel) {
      return message.react('🔴');
    }
    interval = setInterval(async () => {
      await channel.send("oh");
    }, 20000); // 20000 ms = 20 seconds
    isEnabled = true;
    message.react('✅');
  } else if (message.content === "=off" && isEnabled) {
    clearInterval(interval);
    isEnabled = false;
    message.react('✅');
  }
});