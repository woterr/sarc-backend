require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let user;

client.once("ready", async () => {
  console.log("Bot is online");
  const guild = client.guilds.cache.get("923210019632201808");
  user = await guild.members.fetch("581048093412425750"); // raj: 261816312462835712
  //   user.send("w");
});

const embed = new EmbedBuilder().setColor("#ffffff").setTimestamp();

function sendEmbed(data) {
  embed.setDescription(
    `Message from **${
      data.name ? data.name : "Unknown"
    }**,
    \nEmail: **${data.email}**\n\n${data.message}`
  );
  user.send({ embeds: [embed] });
}

client.login(process.env.DISCORD_TOKEN);
module.exports = {
  sendEmbed,
};
