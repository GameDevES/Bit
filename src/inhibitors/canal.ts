import { Inhibitor, InhibitorStore, KlasaMessage } from 'klasa';
import { Channel } from 'discord.js';

export default class extends Inhibitor {

	public constructor(store: InhibitorStore, file: string[], directory: string) {
		super(store, file, directory, {});
	}

	public run(message: KlasaMessage) {
		if (message.author.bot === false) {
			let debeMandarMensaje = false;
			const activados = message.guild?.settings.get('canales.activados') as Channel[];
			for (const activado of activados) {
				if (message.channel === activado) {
					debeMandarMensaje = true;
				}
			}
			if (!debeMandarMensaje) {
				throw 'No se pueden enviar comandos a este canal.';
			}
		}
	}

}
