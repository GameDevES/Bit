const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permLevel: 10,
			name: 'habilitar',
			description: 'Rehabilita o habilita temporalmente un comando/inhibidor/monitor/finalizador. El estado por defecto se restablece al reiniciar.',
			usage: '<Piece:piece>'
		});
	}

	async run(msg, [piece]) {
		piece.enable();
		return msg.sendCode('diff', msg.language.get('COMMAND_ENABLE', piece.type, piece.name));
	}

};
