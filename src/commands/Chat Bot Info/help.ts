import { BitCommand } from '../../utils/BitCommand';
import { CommandStore, KlasaMessage, util, Command, RichDisplay, ReactionHandler } from 'klasa';
import { Collection, MessageEmbed, Permissions, TextChannel } from 'discord.js';

const PERMISSIONS_RICHDISPLAY = new Permissions([Permissions.FLAGS.MANAGE_MESSAGES, Permissions.FLAGS.ADD_REACTIONS]);
const time = 1000 * 60 * 3;

export default class extends BitCommand {

	private handlers: Map<string, ReactionHandler>;

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['ayuda'],
			name: 'help',
			guarded: true,
			description: language => language.get('COMMAND_HELP_DESCRIPTION'),
			usage: '(Command:command)'
		});

		this.createCustomResolver('command', (arg, possible, message) => {
			if (!arg) return undefined;
			return this.client.arguments.get('commandname')!.run(arg, possible, message);
		});

		this.handlers = new Map();
	}

	public async run(message: KlasaMessage, [command]: [Command]) {
		if (command) {
			return message.sendMessage([
				`= ${command.name} = `,
				util.isFunction(command.description) ? command.description(message.language) : command.description,
				message.language.get('COMMAND_HELP_USAGE', command.usage.fullUsage(message)),
				message.language.get('COMMAND_HELP_EXTENDED'),
				util.isFunction(command.extendedHelp) ? command.extendedHelp(message.language) : command.extendedHelp
			], { code: 'asciidoc' });
		}
		if (!('all' in message.flags) && message.guild && (message.channel as TextChannel).permissionsFor(this.client.user!)!.has(PERMISSIONS_RICHDISPLAY)) {
			const previousHandler = this.handlers.get(message.author.id);
			if (previousHandler) previousHandler.stop();

			const handler = await (await this.buildDisplay(message)).run(await message.send('Loading Commands...'), {
				filter: (reaction, user) => user.id === message.author.id,
				time
			});
			handler.on('end', () => this.handlers.delete(message.author.id));
			this.handlers.set(message.author.id, handler);
			return handler;
		}

		return message.author.send(await this.buildHelp(message), { split: { 'char': '\n' } })
			.then(async () => { if (message.channel.type !== 'dm') await message.sendMessage(message.language.get('COMMAND_HELP_DM')); })
			.catch(async () => { if (message.channel.type !== 'dm') await message.sendMessage(message.language.get('COMMAND_HELP_NODM')); });
	}

	public async buildHelp(message: KlasaMessage) {
		const commands = await this._fetchCommands(message);
		const prefix = message.guildSettings.get('prefix') as string;

		const helpMessage = [];
		for (const [category, list] of commands) {
			helpMessage.push(`**${category} Commands**:\n`, list.map(this.formatCommand.bind(this, message, prefix, false)).join('\n'), '');
		}

		return helpMessage.join('\n');
	}

	private async buildDisplay(message: KlasaMessage) {
		const commands = await this._fetchCommands(message);
		const prefix = message.guildSettings.get('prefix') as string;
		const display = new RichDisplay();
		const color = message.member!.displayColor;
		for (const [category, list] of commands) {
			display.addPage(new MessageEmbed()
				.setTitle(`${category} Commands`)
				.setColor(color)
				.setDescription(list.map(this.formatCommand.bind(this, message, prefix, true)).join('\n')));
		}

		return display;
	}

	private formatCommand(message: KlasaMessage, prefix: string, richDisplay: boolean, command: Command) {
		const description = util.isFunction(command.description) ? command.description(message.language) : command.description;
		return richDisplay ? `• ${prefix}${command.name} → ${description}` : `• **${prefix}${command.name}** → ${description}`;
	}

	private async _fetchCommands(message: KlasaMessage) {
		const run = this.client.inhibitors.run.bind(this.client.inhibitors, message);
		const commands = new Collection<string, Command[]>();
		await Promise.all(this.client.commands.map(command => run(command, true)
			.then(() => {
				const category = commands.get(command.category);
				if (category) category.push(command);
				else commands.set(command.category, [command]);
				return null;
			}).catch()));

		return commands;
	}

}
