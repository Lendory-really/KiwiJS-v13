module.exports = {
  name: "system",
  aliases: ["sys"],
  usage: "k!sys",
  description: "Выдает информацию о системе",
  category: "Бот",
  run: async (client,message,args) => {
    const embed = {
      title: "Система",
      fields: [{name: "Информация о памяти", value: `**Всего:** ${(require("os").totalmem() / 1024 / 1024).toFixed(2)} mb\n**Используется:** ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}mb\n**Свободно:** ${(require("os").totalmem() / 1024 / 1024).toFixed(2) - (process.memoryUsage().rss / 1024 / 1024).toFixed(2)}mb`},
    {name: "Система", value: `**OS:** ${require("os").platform} ${require("os").arch}`}],
      color: '#083ebe'
    }
    message.reply({embeds:[embed]})
  }
}