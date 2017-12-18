const Comando = require('../../estructuras/Comando');

module.exports = class extends Comando {

	constructor(...args) {
		super(...args, {
			aliases: ['details', 'what'],
			description: 'Proporciona alguna informacion sobre este bot.',
			extendedHelp: '+info'
		});
		this.comando = '+info';
        this.admins = false;
	}

	async run(msg) {
		return msg.sendMessage(msg.language.get('COMMAND_INFO'));
	}

};
