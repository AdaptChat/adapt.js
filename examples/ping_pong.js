const { Client } = require("adapt.chat");
const client = new Client();

client.on("ready", () => {
  console.log(client.user?.displayName + " is online and ready!");
});

client.on("messageCreate", async (message) => {
  if (message.content == "!ping")
    await message.channel.send({ content: "pong" });
});

client.on("error", (error) => {
  console.log(error);
});

client.login(
  "token here"
);