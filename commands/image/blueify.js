module.exports = {
  name: "blueify",
  aliases: ["blue"],
  category: "Картинка",
  description: "Выдает измененную автарку юзера",
  usage: "k!blueify [user]",
  run: async (client, message, args) => {
    let user;
    if (args[0]) {
      let member = message.guild.members.cache.get(args[0].replace(/[\\<>@!]/g,""))
      user = member
    } else {
      user = message.member
    }
    let avatar = user.user.avatarURL({size: 2048, dynamic: true})
    const embed = {
	    title: 'Ого, как много синего!',
	    description: `**Юзер:** ${user.user.tag}`,
      color: "#083ebe",
      image: {
        url: `https://api.no-api-key.com/api/v2/blueify?image=${avatar}`
      }
	  }
    message.reply({embeds:[embed]})
  }
}