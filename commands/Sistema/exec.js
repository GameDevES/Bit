const { util } = require('klasa');
const Comando = require('../../estructuras/Comando');

module.exports = class extends Comando {

	constructor(...args) {
		super(...args, {
			permLevel: 4,
			name: 'ejecutar',
			description: 'Execute commands in the terminal, use with EXTREME CAUTION.',
			usage: '<expression:str>'
		});
	}

	async run(msg, [input]) {
		const result = await util.exec(input).catch((err) => { throw err; });

		const output = result.stdout ? `**\`OUTPUT\`**${util.codeBlock('sh', result.stdout)}` : '';
		const outerr = result.stderr ? `**\`ERROR\`**${util.codeBlock('sh', result.stderr)}` : '';
		return msg.send([output, outerr].join('\n'));
	}

};