const Comando = require('../../estructuras/Comando');
const fs = require('fs-nextra');
const { resolve, join } = require('path');

module.exports = class extends Comando {

	constructor(...args) {
		super(...args, {
			permLevel: 6,
			name: 'transferir',
			description: 'Transfiere un modulo principal a su respectiva carpeta',
			usage: '<Command:cmd|Inhibitor:inhibitor|Event:event|Monitor:monitor|Language:language|Finalizer:finalizer>',
			extendedHelp: '+transfer ayuda'
		});
		this.comando = '+transferir <Modulo>';
        this.admins = true;
	}

	async run(msg, [piece]) {
		const file = piece.type === 'command' ? join(...piece.file) : piece.file;
		const fileLocation = resolve(this.client.coreBaseDir, `${piece.type}s`, file);
		await fs.access(fileLocation).catch(() => { throw msg.language.get('COMMAND_TRANSFER_ERROR'); });
		return fs.copy(fileLocation, resolve(this.client.clientBaseDir, `${piece.type}s`, file))
			.then(() => {
				this.client[`${piece.type}s`].load(resolve(this.client.clientBaseDir, `${piece.type}s`), piece.file);
				return msg.sendMessage(msg.language.get('COMMAND_TRANSFER_SUCCESS', piece.type, piece.name));
			})
			.catch((err) => {
				this.client.emit('error', err.stack);
				return msg.sendMessage(msg.language.get('COMMAND_TRANSFER_FAILED', piece.type, piece.name));
			});
	}

};
