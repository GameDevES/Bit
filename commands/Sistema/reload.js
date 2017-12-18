const Comando = require('../../estructuras/Comando');

module.exports = class extends Comando {

	constructor(...args) {
		super(...args, {
			aliases: ['r'],
			permLevel: 6,
			name: 'recargar',
			description: (msg) => msg.language.get('COMMAND_RELOAD_DESCRIPTION'),
			usage: '<Store:store|Piece:piece>',
			extendedHelp: '+recargar encuesta'
		});
		this.comando = '+recargar <Modulo>';
        this.admins = true;
	}

	async run(msg, [piece]) {
		if (piece instanceof this.client.methods.Collection) {
			const timer = new Stopwatch();
			await piece.loadAll();
			await piece.init();
			return msg.sendMessage(`${msg.language.get('COMMAND_RELOAD_ALL', piece)} (Took: ${timer.stop()})`);
		}
		return piece.reload()
			.then(itm => msg.sendMessage(msg.language.get('COMMAND_RELOAD', itm.type, itm.name)))
			.catch(err => {
				this.client[`${piece.type}s`].set(piece);
				msg.sendMessage(`? ${err}`);
			});
	}

};
