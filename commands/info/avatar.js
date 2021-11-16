let status = {online: 'В сети',idle: 'Нет на месте',dnd: 'Не беспокоить',offline: 'Не в сети'}
const strftime = require("strftime")
module.exports = {
  name: "avatar",
  aliases: ["ua", "pfp", "ava"],
  category: "Юзер-команды",
  description: "Выдает информацию о аватаре",
  usage: "k!avatar \[user\]",
  run: async (client, message, args) => {
    let user;
    if (args[0]) {
      let member = message.guild.members.cache.get(args[0].replace(/[\\<>@!]/g,""))
      user = member
    } else {
      user = message.member
    }
    let avatar = user.user.avatarURL({size: 2048, dynamic: true})
    let embed = {
      title: "Аватар",
      description: `**Юзер:** ${user.user.tag}`,
      color: "#083ebe",
      image: { url: avatar },
      footer: {
        text: `ID: ${user.id}`
      }
    }
    message.reply({embeds:[embed]}) 
  }
}