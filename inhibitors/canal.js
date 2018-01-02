const { Inhibitor } = require('klasa');
var ji = [];

module.exports = class extends Inhibitor {

	constructor(...args) {
		super(...args, { spamProtection: true });
	}

	async run(msg) {
		if (msg.author.bot == false) {
			for (let i = 0; i < msg.guild.configs.Activados.length; i++) {
				if (msg.channel.id == msg.guild.configs.Activados[i]) {
					ji = [i];
				}
			}
		}
		if (ji.length < 1) {
			throw "No se pueden enviar comandos a este canal.";
		} else {
			ji = [];
		}
	}

};