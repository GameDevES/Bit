const Comando = require('../../estructuras/Comando');

module.exports = class extends Comando {

	constructor(...args) {
		super(...args, { description: 'Comando Ping/Pong. ¿Me pregunto qué hace esto? /sarcasmo',
			extendedHelp: '+ping'
		 });
		this.comando = '+ping';
        this.admins = false;
	}

	async run(msg) {
		const message = await msg.sendMessage(msg.language.get('COMMAND_PING'));
		return msg.sendMessage(msg.language.get('COMMAND_PINGPONG', message.createdTimestamp - msg.createdTimestamp, Math.round(this.client.ping)));
	}

};
