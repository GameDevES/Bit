import { KlasaMessage, Monitor, MonitorStore, KlasaUser, util } from 'klasa';
import { Canvas } from 'canvas-constructor';
import { readFile } from 'fs-nextra';
import { join } from 'path';

export default class ExprienceMonitor extends Monitor {

	public cooldowns: Set<string>;
	public template: Buffer;

	public constructor(store: MonitorStore, file: string[], directory: string) {
		super(store, file, directory, { ignoreOthers: false, ignoreSelf: true });
		this.cooldowns = new Set();
		this.template = Buffer.alloc(0);
	}

	public async run(message: KlasaMessage) {
		if (!message.guild || !message.author.settings.get('class')) return;

		const prefix = message.guildSettings.get('prefix');
		if (prefix) {
			for (const prf of Array.isArray(prefix) ? prefix : [prefix]) {
				const regex = RegExp(`^${util.regExpEsc(prf)}`, '');
				if (regex.test(message.toString())) return;
			}
		}

		if (this.cooldown(message)) return;

		const previousLevel = (message.author.settings.get('level') as number);
		const experience = (message.author.settings.get('experience') as number) + Math.round((Math.random() * 4) + 4);
		const level = Math.floor(0.2 * Math.sqrt(experience));
		await message.author.settings.update([['experience', experience], ['level', level]]);

		if ((level !== previousLevel)) {
			this.generate(message.author).then(attachment => message.channel.sendFile(attachment, 'levelup.png', message.author.toString())).catch(() => {});
		}
	}

	public cooldown(message: KlasaMessage) {
		if (this.cooldowns.has(message.author.id)) return true;
		this.cooldowns.add(message.author.id);
		setTimeout(() => this.cooldowns.delete(message.author.id), 60000);
		return false;
	}

	public generate(user: KlasaUser) {
		return new Canvas(225, 192)
			.addImage(this.template, 0, 0, 225, 192)

			// Text
			.setTextAlign('center')
			.setShadowColor('#FFFFFF')
			.setShadowOffsetX(1)
			.setTextFont('19px whitney-blacksc')
			.addText('¡HAS SUBIDO AL', 112, 31)
			.setTextFont('19px whitney-medium')
			.setTextAlign('right')
			.addText(`NIVEL ${user.settings.get('level')}`, 144, 53)
			.setTextAlign('left')
			.setTextFont('19px whitney-blacksc')
			.addText('!', 146, 53)
			.toBufferAsync();
	}

	public async init() {
		const ASSETS = join(__dirname, '..', '..', '..', 'assets');
		this.template = await readFile(join(ASSETS, 'images', 'levelup.png'));
	}

}
