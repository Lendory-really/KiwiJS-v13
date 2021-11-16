module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
    client.user.setPresence({ activities: [{ name: 'KiwiJS', type: "LISTENING"}], status: 'idle' });
		console.log(`Запущено ${client.user.tag}`);
	},
};