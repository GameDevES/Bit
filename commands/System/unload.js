const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['u'],
			permLevel: 10,
			name: 'descargar',
			description: 'Descarga un modulo de Klasa.',
			usage: '<Piece:piece>'
		});
	}

	async run(msg, [piece]) {
		piece.unload();
		return msg.sendMessage(msg.language.get('COMMAND_UNLOAD', piece.type, piece.name));
	}

};
