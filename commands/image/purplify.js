module.exports = {
  name: "purplify",
  aliases: ["purple"],
  category: "Картинка",
  description: "Выдает измененную автарку юзера",
  usage: "k!purplify [user]",
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
	    title: 'Ого, как много фиолтевого!',
	    description: `**Юзер:** ${user.user.tag}`,
      color: "#083ebe",
      image: {
        url: `https://api.no-api-key.com/api/v2/purplify?image=${avatar}`
      }
	  }
    message.reply({embeds:[embed]})
  }
}