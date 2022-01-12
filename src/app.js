require("dotenv").config();
const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const token = process.env.TOKEN;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const command = require("./deploy-commands");
client.commands = new Collection();

command.run();

const commandFiles = fs
	.readdirSync("./src/commands")
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: "There was an error while executing this command!",
			ephemeral: true,
		});
	}
});

client.once("ready", () => {
	console.log("Ready!");
});

client.login(token);
