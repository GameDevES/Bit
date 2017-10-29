const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['details', 'what'],
			description: 'Proporciona alguna informacion sobre este bot.'
		});
	}

	async run(msg) {
		return msg.sendMessage(msg.language.get('COMMAND_INFO'));
	}

};
