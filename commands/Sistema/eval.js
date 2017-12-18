const Comando = require('../../estructuras/Comando');
const { inspect } = require('util');

module.exports = class extends Comando {

	constructor(...args) {
		super(...args, {
			aliases: ['ev'],
			permLevel: 6,
			name: 'evaluar',
			description: 'Ejecuta código arbitrario en JavaScript. Reservado para el poseedor del bot.',
			usage: '<expression:str>',
			extendedHelp: '+evaluar msg.author;'
		});
		this.comando = '+eval <funcion javascript>';
        this.admins = true;
	}

	async run(msg, [code]) {
		try {
			let evaled = eval(code);
			if (evaled instanceof Promise) evaled = await evaled;
			if (typeof evaled !== 'string') evaled = inspect(evaled, { depth: 0 });
			msg.sendCode('js', this.client.methods.util.clean(evaled));
		} catch (err) {
			msg.sendMessage(`\`ERROR\`${this.client.methods.util.codeBlock('js', this.client.methods.util.clean(err))}`);
			if (err.stack) this.client.emit('error', err.stack);
		}
	}

};
