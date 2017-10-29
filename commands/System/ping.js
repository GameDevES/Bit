const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, { description: 'Comando Ping/Pong. ¿Me pregunto qué hace esto? /sarcasmo' });
	}

	async run(msg) {
		const message = await msg.sendMessage(msg.language.get('COMMAND_PING'));
		return msg.sendMessage(msg.language.get('COMMAND_PINGPONG', message.createdTimestamp - msg.createdTimestamp, Math.round(this.client.ping)));
	}

};
