
module.exports = {
  name: "eval",
  aliases: ["e", "ev"],
  category: "Разработчик",
  description: "Выдает результат выполненого кода",
  usage: "k!eval",
  run: async (client, message, args) => {
    if (message.author.id !== "731197274130219101") return;
  const { inspect } = require('util');
  const { MessageEmbed } = require('discord.js');

  let code = args.join(" ")
  try {
    let preEval = process.hrtime.bigint();
    let evaled = await eval(code);
    let lastEval = process.hrtime.bigint();
  if (typeof evaled !== "string") evaled = inspect(evaled);
  message.reply(`\`\`\`js\n${evaled.slice(0, 1900)}\`\`\``, { code: "js" });
  } catch(e) {
    if (typeof(e) == "string") e = e.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    let evalerror = {
        title: ("Произошла ошибка"),
        description: "\`\`\`" + e + "\`\`\`",
        color: "fc0000"
    }
    message.reply({embeds:[evalerror]});
  }
}}