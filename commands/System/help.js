const { Command } = require('klasa');

const ayuda = '```md\n < AYUDA: RESUMEN GENERAL >\n\n# Consejo\n> Usa +ayuda <comando> para obtener más información de un comando específico, por ejemplo +ayuda estado. \n\n';

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['commands'],
			name: 'ayuda',
			description: 'Enseña la ayuda de un comando.',
			usage: '[Command:cmd]'
		});
	}

	async run(msg, [cmd]) {
		const method = this.client.user.bot ? 'author' : 'channel';
		if (cmd) {
			const info = [
				`= ${cmd.name} = `,
				cmd.description,
				`usage :: ${cmd.usage.fullUsage(msg)}`,
				'Extended Help ::',
				cmd.extendedHelp
			].join('\n');
			return msg.sendMessage(info, { code: 'asciidoc' });
		}
		const help = await this.buildHelp(msg);
		const categories = Object.keys(help);
		const helpMessage = [];
		var subCategories1;
		for (let cat = 0; cat < categories.length; cat++) {
			const subCategories = Object.keys(help[categories[cat]]);
			subCategories1 = '';
			for (let subCat = 0; subCat < subCategories.length; subCat++) { 
				if(subCat != (subCategories.length-1)) {
					subCategories1 = subCategories1 + `${help[categories[cat]][subCategories[subCat]].join(' ')}`;
				}else {
					subCategories1 = subCategories1 + `${help[categories[cat]][subCategories[subCat]].join(' ')}\n`;
				}
			}
			helpMessage.push((cat+1) + `. ` + categories[cat].toUpperCase() + ` — ` + subCategories1);
		}

		return msg.channel.send(ayuda + this.helpMessage1(categories, helpMessage) + '```');
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
