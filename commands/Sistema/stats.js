const { version: klasaVersion } = require('klasa');
const { version: discordVersion } = require('discord.js');
const uptime = require('os-uptime');
const moment = require('moment');
require('moment-duration-format');
const Comando = require('../../estructuras/Comando');

module.exports = class extends Comando {

	constructor(...args) {
		super(...args, { description: 'Proporciona algunos detalles sobre el bot y estadísticas.',
		name: 'estadisticas',
		extendedHelp: '+estadisticas'});
		this.comando = '+estadisticas';
        this.admins = false;
	}

	async run(msg) {
		const duration = moment.duration(this.client.uptime).format(' D [dias], H [horas], m [minutos], s [segundos]');
		return msg.sendCode('asciidoc', [
			'= ESTADÍSCTICAS =',
			`• Usuarios      :: ${this.client.users.size.toLocaleString()}`,
			`• Canales       :: ${this.client.channels.size.toLocaleString()}`,
			`• Node          :: ${process.version}`,
			`• Discord.js    :: v${discordVersion}`,
			'= TIEMPO =',
			`• Host          :: ${uptime().toLocaleString()}`,
			`• Total         :: ${duration}`,
			'',
			'= USO DEL HOST =',
			`• Uso de la RAM :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
			`• RAM +Node     :: ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`
		]);
	}

};