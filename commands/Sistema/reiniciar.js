const Comando = require('../../estructuras/Comando');

module.exports = class extends Comando {

	constructor(...args) {
		super(...args, {
			permLevel: 6,
			name: 'reiniciar',
			description: 'Reinicia el bot.',
			extendedHelp: '+reiniciar'
		});
		this.comando = '+reiniciar';
        this.admins = true;
	}

	async run(msg) {
		await msg.sendMessage(msg.language.get('COMMAND_REBOOT')).catch(err => this.client.emit('error', err));
		process.exit();
	}

};
