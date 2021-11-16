module.exports = {
  name: "ping",
  aliases: ["latency"],
  usage: "k!ping",
  description: "Выдает пинг бота и пинг Discord API",
  category: "Бот",
  run: async (client,message,args) => {
    const embed = {
      title: "Понг!",
      description: `**Пинг бота:** ${Date.now()-message.createdTimestamp}ms\n**Пинг API:** ${client.ws.ping}ms`,
      color: '#083ebe'
    }
    message.reply({embeds:[embed]})
  }
}