const Comando = require('../../estructuras/Comando');

module.exports = class extends Comando {

	constructor(...args) {
		super(...args, {
			permLevel: 6,
			name: 'deshabilitar',
			description: 'Re-deshabilita o deshabilita temporalmente un comando/inhibidor/monitor/finalizador/evento. El estado por defecto se restablece al reiniciar.',
			usage: '<Piece:piece>',
			extendedHelp: '+deshabilitar encuesta'
		});
		this.comando = '+deshabilitar <Modulo>';
        this.admins = true;
	}

	async run(msg, [piece]) {
		if ((piece.type === 'event' && piece.name === 'Message') || (piece.type === 'monitor' && piece.name === 'commandHandler')) {
			return msg.sendMessage(msg.language.get('COMMAND_DISABLE_WARN'));
		}
		piece.disable();
		return msg.sendCode('diff', msg.language.get('COMMAND_DISABLE', piece.type, piece.name));
	}

};
