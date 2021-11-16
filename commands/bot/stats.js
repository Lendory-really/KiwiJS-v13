const Discord = require("discord.js")
module.exports = {
  name: "stats",
  aliases: ["bot", "botinfo"],
  category: "Бот",
  description: "Показывает детализированную информацию о боте.",
  usage: "k!stats",
  run: async (client, message, args) => {
    let weeks = Math.floor(client.uptime / 604800000)
let days = Math.floor(client.uptime / 86400000) % 7
  let hours = Math.floor(client.uptime / 3600000) % 24;
  let minutes = Math.floor(client.uptime / 60000) % 60;
  let seconds = Math.floor(client.uptime / 1000) % 60;
 let up;
if (weeks == 0 && days == 0 && hours == 0 && minutes == 0) up = `${seconds}с`
else if (weeks == 0 && days == 0 && hours == 0) up = `${minutes}м ${seconds}с`
else if (weeks == 0 && days == 0) up = `${hours}ч ${minutes}м ${seconds}с`
else if (weeks == 0) up = `${days}д ${hours}ч ${minutes}м ${seconds}с`
else up = `${weeks} ${days}д ${hours}ч ${minutes}м ${seconds}с`
  let ping;
  if (client.ws.ping<300) ping = `:green_circle:`
  else if (client.ws.ping<600) ping = `:yellow_circle:`
  else if (client.ws.ping<1400) ping = `:orange_circle:`
  else if (client.ws.ping<1700) ping = `:red_circle:`
  else if (client.ws.ping>1700) ping = `:black_circle:`


  let embed = {
    title: "Статистика бота",
    fields: [
    {name: "Основное", value: `**Пинг:** ${client.ws.ping}ms\n**Аптайм:** ${up}\n**Задержка между сообщениями:** ${Date.now() - message.createdTimestamp}ms\n**Сервера:** ${client.guilds.cache.size}\n**Юзеры:** ${client.users.cache.size}`},
    
    {name: "Хостинг", value: `**Платформа:** ${require('os').platform} ${require('os').arch}\n**Память (RSS):** ${(process.memoryUsage().rss / 1024 / 1024).toFixed(0)} MB / ${(require("os").totalmem() / 1024 / 1024).toFixed(0)} MB\n**Память (Heap):** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB\n**Процессор:** ${require('os').cpus()[0].model}`},
    {name: "Другое", value: `**Статус:** ${ping}\n **Разработчик:** Lendory?#6241`}
    ],
    color: '#083ebe'
  }
  message.reply({embeds:[embed]})
  }
}