const Comando = require('../../estructuras/Comando');
const { util } = require('klasa');

const ayuda = '```md\n < AYUDA: RESUMEN GENERAL >\n\n# Consejo\n> Usa +ayuda <comando> para obtener más información de un comando específico, por ejemplo +ayuda estado. \n\n';
var info = [];

module.exports = class extends Comando {

	constructor(...args) {
		super(...args, {
			aliases: ['commands'],
			name: 'ayuda',
			description: 'Enseña la ayuda de un comando.',
			usage: '[Command:cmd]',
			extendedHelp: '+ayuda encuesta'
		});
		this.comando = '+ayuda [comando]';
        this.admins = false;
	}

	async run(msg, [cmd]) {
		const Emojis = msg.guild.configs.Emojis;
		const gamedeves = this.client.emojis.get(Emojis[0]);
		const nombreboteh = this.client.emojis.get(Emojis[1]);
		const nombrebotconfundido = this.client.emojis.get(Emojis[2]);


				const ayuda1 = ['```fix',
								'AYUDA: 2. SISTEMA — ¿AYUDA?',
								'```',
								`${nombreboteh} Sí, claramente necesitas ayuda.`,
								`http://gph.is/16XYtwG`
								];
				const ayuda2 = ['```fix',
								'AYUDA: 2. SISTEMA — ¿AYUDA?',
								'```',
								`${nombreboteh} ¿En serio acabas de poner +ayuda ayuda?`
								];
				const ayuda3 = ['```fix',
								'AYUDA: 2. SISTEMA — ¿AYUDA?',
								'```',
								`${nombreboteh} Alguien ha tenido un día duro.\n`,
								`http://gph.is/1bz7LSn`
								];
				const ayuda4 = ['```fix',
								'AYUDA: 2. SISTEMA — ¿AYUDA?',
								'```',
								`**Contraseña incorrecta.**\n`,
								`Has llegado al sótano secreto de GamedevES. Aquí es donde jugamos a las cartas con parches de pirata.`,
								`Desgraciadamente no puedes pasar.\n`,
								`${nombrebotconfundido}`
								];
				const ayuda5 = ['```fix',
								'AYUDA: 2. SISTEMA — ¿AYUDA?',
								'```',
								`¿Y quién creó al creador?...`,
								`¿Y quién creó al creador que creó al creador?...`,
								`¿Y quién creó al creador que creó al creador que creó al creador?...\n`,
								`${nombreboteh}`
								];
				const ayuda6 = ['```fix',
								'AYUDA: 2. SISTEMA — ¿AYUDA?',
								'```\n',
								`${nombreboteh} Error. Has creado un bucle espacio-temporal.\n`,
								`http://gph.is/1NnJLmb`
								];
				const ayuda7 = ['```fix',
								'AYUDA: 2. SISTEMA — ¿AYUDA?',
								'```',
								`${nombreboteh} ¡Pero si todo va bien!\n`,
								`http://gph.is/1b0oSLy`
								];
				const ayuda8 = ['```fix',
								'AYUDA: 2. SISTEMA — ¿AYUDA?',
								'```',
								`${nombreboteh} Te puedo ayudar una vez pero si son dos veces, merezco propina.`
								];
				const ayudaEgg = [ayuda1, ayuda2, ayuda3, ayuda4, ayuda5, ayuda6, ayuda7, ayuda8];

		const method = this.client.user.bot ? 'author' : 'channel';
		
		const help = await this.buildHelp(msg);
		const categories = Object.keys(help);
		const helpMessage = [];
		var subCategories1;
		for (let cat = 0; cat < categories.length; cat++) {
			const subCategories = Object.keys(help[categories[cat]]);
			subCategories1 = '';
			for (let subCat = 0; subCat < subCategories.length; subCat++) { 
				var i = 0;
				for( i = 0; i < help[categories[cat]][subCategories[subCat]].length; i++) {
					if(i < (help[categories[cat]][subCategories[subCat]].length - 1)) {
						subCategories1 = subCategories1 + `${help[categories[cat]][subCategories[subCat]][i]}` + ', ';
					}else {
						subCategories1 = subCategories1 + `${help[categories[cat]][subCategories[subCat]][i]}\n`;
					}
				}

				console.log(subCategories1);
				
				if (cmd) {
					if (cmd && help[categories[cat]][subCategories[subCat]].includes(cmd.name) && cmd.admins && !(cmd.name == 'ayuda')) {
						info = [
							'```fix',
							`AYUDA: ` + (cat+1) + `. ` + cmd.category.toUpperCase() + ` — ` + cmd.name.toUpperCase(),
							'```',
							`${gamedeves}` + ' **Comando:**  ``' + cmd.comando + '`` \n',
							`${gamedeves}` + ' **Descripción:**   ' + `${util.isFunction(cmd.description) ? cmd.description(msg) : cmd.description}` + '\n',
							`${gamedeves} **Ejemplo de uso:**   _`+ `${util.isFunction(cmd.extendedHelp) ? cmd.extendedHelp(msg) : cmd.extendedHelp}` + `_\n`,
							'```md',
							'* Función reservada sólo para administradores',
							'```' 
						].join('\n');
					}
					if (cmd && help[categories[cat]][subCategories[subCat]].includes(cmd.name) && !cmd.admins && !(cmd.name == 'ayuda')) {
						info = [
							'```fix',
							`AYUDA: ` + (cat+1) + `. ` + cmd.category.toUpperCase() + ` — ` + cmd.name.toUpperCase(),
							'```',
							`${gamedeves}` + ' **Comando:**  ``' + cmd.comando + '`` \n',
							`${gamedeves}` + ' **Descripción:**   ' + `${util.isFunction(cmd.description) ? cmd.description(msg) : cmd.description}` + '\n',
							`${gamedeves} **Ejemplo de uso:**   _`+ `${util.isFunction(cmd.extendedHelp) ? cmd.extendedHelp(msg) : cmd.extendedHelp}` + `_\n`,
						].join('\n');
					}
					if(!(typeof cmd.opcional == "undefined")) {
						var optional = ``;
						for(var e = 0; e < cmd.opcional.length; e++) {
								optional = optional + `\n` + cmd.opcional[e];
							}
						if (cmd && help[categories[cat]][subCategories[subCat]].includes(cmd.name) && !cmd.admins && !(cmd.name == 'ayuda')) {
							info = [
								'```fix',
								`AYUDA: ` + (cat+1) + `. ` + cmd.category.toUpperCase() + ` — ` + cmd.name.toUpperCase(),
								'```',
								`${gamedeves}` + ' **Comando:**  ``' + cmd.comando + '`` \n',
								`${gamedeves}` + ' **Descripción:**   ' + `${util.isFunction(cmd.description) ? cmd.description(msg) : cmd.description}` + '\n',
							`${gamedeves} **Ejemplo de uso:**   _`+ `${util.isFunction(cmd.extendedHelp) ? cmd.extendedHelp(msg) : cmd.extendedHelp}` + `_\n`,
								optional
							].join('\n');
						}
					}	
					if (cmd && help[categories[cat]][subCategories[subCat]].includes(cmd.name) && !cmd.admins && cmd.name == 'ayuda') {
						var x = Math.floor((Math.random() * 8) + 1);
						info = ayudaEgg[x];
					}
				}
			}
			helpMessage.push((cat+1) + `. ` + categories[cat].toUpperCase() + ` — ` + subCategories1);
		}

		if(cmd) {
			return msg.sendMessage(info);
		} else {
			return msg.channel.send(ayuda + this.helpMessage1(categories, helpMessage) + '```');
		}
	}

	async buildHelp(msg) {
		const help = {};

		const commandNames = Array.from(this.client.commands.keys());
		const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

		await Promise.all(this.client.commands.map((command) =>
			this.client.inhibitors.run(msg, command, true)
				.then(() => {
					if (!help.hasOwnProperty(command.category)) help[command.category] = {};
					if (!help[command.category].hasOwnProperty(command.subCategory)) help[command.category][command.subCategory] = [];
					help[command.category][command.subCategory].push(`${command.name.padEnd(1)}`);
					return;
				})
				.catch(() => {
					// noop
				})
		));
		return help;
	}

	helpMessage1(categories, helpMessage) {
		var helpM = '';
		for(let cat = 0; cat < categories.length; cat++) {
			helpM = helpM + helpMessage[cat];
		}
		return helpM;
	}

};
