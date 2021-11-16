module.exports = {
  name: "help",
  aliases: ["h"],
  category: "Информационные",
  description: "Выдает информацию о командах или команде",
  usage: "k!help \[cmd\]",
  run: async (client, message, args) => {
    if (args[0]) {
      let command;
      if (client.commands.get(args[0])) {
        command = await client.commands.get(args[0])
      } else {
        command = await client.commands.get(client.aliases.get(args[0]))
      }
      if (!command) {
        message.reply("Данная команда не найдена")
      }
      const embed = {
        title: `Команда: ${command.name}`,
        fields: [
          {name: "Описание", value: `\`\`\`${(command.description)}\`\`\``},
          {name: "Использование", value: `\`\`\`${command.usage}\`\`\``, inline: true},
          {name: "Алиасы", value: `\`\`\`${command.aliases.join(", ")}\`\`\``, inline: true}
        ],
        color: "#083ebe"
      }
      message.reply({embeds: [embed]})
    } else {
      const embed = {
        title: `Команды`,
        fields: [
          {name: "Бот", value: `\`\`\`${client.commands.filter(c => c.category == "Бот").map(c => c.name).join(", ")}\`\`\``},
          {name: "Информация", value: `\`\`\`${client.commands.filter(c => c.category == "Информационные").map(c => c.name).join(", ")}\`\`\``},
          {name: "Юзер-инфо", value: `\`\`\`${client.commands.filter(c => c.category == "Юзер-команды").map(c => c.name).join(", ")}\`\`\``},
          {name: "Картинка", value: `\`\`\`${client.commands.filter(c => c.category == "Картинка").map(c => c.name).join(", ")}\`\`\``}
        ],
        color: "#083ebe",
        footer: {
          text: "k!help [Команда]"
        }
      }
      message.reply({embeds: [embed]})
    }
  }
}
