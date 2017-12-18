const Comando = require('../../estructuras/Comando');

module.exports = class extends Comando {

	constructor(...args) {
		super(...args, {
			aliases: ['u'],
			permLevel: 6,
			name: 'descargar',
			description: 'Descarga un modulo de Klasa.',
			usage: '<Piece:piece>',
			extendedHelp: '+descargar languages'
		});
		this.comando = '+descargar <Modulo>';
        this.admins = true;
	}

	async run(msg, [piece]) {
		piece.unload();
		return msg.sendMessage(msg.language.get('COMMAND_UNLOAD', piece.type, piece.name));
	}

};
