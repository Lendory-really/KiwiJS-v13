const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES] });
const {prefix} = require("./config.json")
client.commands = new Collection();
client.aliases = new Collection();

const express = require('express');
const server = express();
server.all('/', (req, res) => {res.send(`ок`)})
function keepAlive() {server.listen(3000, () => { console.log("Server is Ready!!" + Date.now()) });}
module.exports = keepAlive;

const { readdirSync } = require("fs");

const ascii = require("ascii-table");

let table = new ascii("Загрузка");
table.setHeading("Файл", "Статус");

const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
  //але, в кансоли  
        for (let file of commands) {
            let pull = require(`./commands/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌`);
                continue;
            }
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    console.log(table.toString());

client.on("messageCreate", async message => {
   

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    try {
      if (command) 
          command.run(client, message, args);
    } catch(e) {
      const embed = {
        title: "Обнаружена ошибка",
        description: `\`\`\`js\n${e.name}: ${e.message}\`\`\``,
        color: "fc0000"
      }
    }
});

client.login(process.env.TOKEN)