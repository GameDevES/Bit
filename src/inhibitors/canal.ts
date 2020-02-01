import { Inhibitor, InhibitorStore, KlasaMessage, SettingsValue } from 'klasa';
import { TextChannel } from 'discord.js';

export default class extends Inhibitor {

	public constructor(store: InhibitorStore, file: string[], directory: string) {
		super(store, file, directory, {});
	}

	public run(message: KlasaMessage) {
		if (message.author.bot === false) {
			let debeMandarMensaje = false;
			const activados = (message.guild?.settings.get('canales.activados') as string[]).map(channel => message.guild?.channels.get(channel)) as TextChannel[];
			for (const activado of activados) {
				if ((message.channel as TextChannel).equals(activado)) {
					debeMandarMensaje = true;
				}
			}
			if (!debeMandarMensaje) {
				throw 'No se pueden enviar comandos a este canal.';
			}
		}
	}

}
