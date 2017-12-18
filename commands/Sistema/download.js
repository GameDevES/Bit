const Comando = require('../../estructuras/Comando');
const snek = require('snekfetch');
const fs = require('fs-nextra');
const { dirname, resolve } = require('path');
const vm = require('vm');

const piecesURL = 'https://raw.githubusercontent.com/GameDevES/Bit/master/';

const mod = { exports: {} };

module.exports = class extends Comando {

	constructor(...args) {
		super(...args, {
			enable: true,
			permLevel: 6,
			name: 'bajar',
			description: 'Descarga un modulo, ya sea desde un enlace o nuestro repositorio de modulos, y lo instala.',
			usage: '<name:str> <folder:str>',
			extendedHelp: '+bajar encuesta c:/ bot'
		});
		this.comando = '+bajar <url/Modulo>';
        this.admins = true;
	}

	async run(msg, [name, folder]) {
		var dir = path.dirname(require.main.filename);

		var link = `${piecesURL}/${folder}/${name}.js`;

		return descargar(link).then((text) => procesar(client, msg, text, link)).catch(err => msg.sendMessage(`${msg.author} | ${err}`));
	}

	async procesar(client, msg, text, link) {
		try {
			vm.runInNewContext(text, { module: mod, exports: mod.exports, require }, { timeout: 500 });
		} catch (err) {
			return client.emit("log", err, "error");
		}
	
		const { name } = mod.exports;
		const description = mod.exports.description || 'No description provided.';
		const type = mod.exports.type || link;
		const modules = mod.exports.requiredModules || 'No required modules.. Yay!';
	
		try {
			this.runChecks(type, name);
			if (mod.exports.selfbot && this.client.user.bot) throw `I am not a selfbot, so I cannot download nor use ${name}.`;
		} catch (err) {
			return msg.sendMessage(`${msg.author} | ${err}`);
		}

		const code = [
			'```asciidoc',
			'=== NOMBRE ===',
			name,
			'\n=== DESCRIPCION ===',
			description,
			'\n=== MODULOS ===',
			modules,
			'```'
		];

		await msg.sendMessage([
			`Estas segurode cargar el siguiente comando?`,
			`Instalara todos los modulos. Esta consola se cerrara en 30 segundos.${code.join('\n')}`
		]);
		const collector = msg.channel.createMessageCollector(mes => mes.author === msg.author, { time: 20000 });
		
		collector.on('collect', (mes) => {
			if (mes.content.toLowerCase() === 'no') collector.stop('aborted');
			if (mes.content.toLowerCase() === 'si') collector.stop('success');
		});

		collector.on('end', async (collected, reason) => {
			if (reason === 'aborted') return msg.sendMessage(`📵 Abortado, Comando no instalado.`);
			else if (reason === 'time') return msg.sendMessage(`⏲ Abortado, Comando no instalado. Te falto el tiempo.`);
			await msg.sendMessage(`📥 \`Cargando ${type.slice(0, -1)}\``).catch(err => this.client.emit('log', err, 'error'));
			if (Array.isArray(modules) && modules.length > 0) {
				await this.client.funcs.installNPM(modules.join(' '))
					.catch((err) => {
						this.client.emit('error', err);
						process.exit();
					});
			}
			return this.load(msg, type, text, name, mod.exports.category || this.client.funcs.toTitleCase(folder));
		});

		return true;
	}

	async load(msg, type, text, name, category) {
		const dir = this.client[type].userDir;
		dir = dir + `/Utiles/`;
		const file = type === 'commands' ? [...category, name] : name;
		const fullPath = type === 'commands' ? resolve(dir, ...file) : resolve(dir, file);
		await msg.sendMessage(`📥 \`Cargando ${type.slice(0, -1)} e ${fullPath}.js...\``);
		await fs.ensureDir(dirname(fullPath)).catch(err => this.client.emit('log', err, 'error'));
		await fs.writeFile(`${fullPath}.js`, text);
		return this.client[type].load(dir, file)
			.then(piece => msg.sendMessage(`📥 Cargado ${piece.type}: ${piece.name}`))
			.catch(response => {
				msg.sendMessage(`📵 Fallo ${name}\n\`\`\`${response}\`\`\``);
				return fs.unlink(`${fullPath}.js`);
			});
	}
	
	async descargar(link) {
		return await snek.get(link).then(d => d.text).catch((error) => {
			if (error.message === "Unexpected token <") throw `Un error ha ocurrido: **${error.message}**`;
			if (error.message === "Not Found") throw `Un error ha ocurrido: **${error.message}** | Introduzaca datos existentes.`
			throw `Un errorha ocurrido: **${error.message}**`;
		});
	}

	runChecks(type, name) {
		if (!name) throw 'I have stopped the load of this piece because it does not have a name value, and I cannot determine the file name without it. Please ask the Developer of this piece to add it.';
		if (!type) throw 'I have stopped the load of this piece because it does not have a type value, and I cannot determine the type without it. Please ask the Developer of the piece to add it.';
		if (this.client[type].has(name)) throw `That ${type.slice(0, -1)} already exists in your bot. Aborting the load.`;
	}

};


