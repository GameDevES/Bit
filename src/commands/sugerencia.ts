import { BitCommand } from '../utils/BitCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Channel, TextChannel, MessageEmbed } from 'discord.js';

export default class extends BitCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			name: 'sugerencia',
			cooldown: 5,
			description: 'Escribe una sugerencia en el canal que hallas selceccionado en la configuración.',
			extendedHelp: '+sugerencia Titulo | Descripción',
			usage: '<titurodesc:str> [...]',
			usageDelim: ' '
		});
	}

	public async run(message: KlasaMessage, [...titulodesc]: [string]) {
		if ((message.guild!.channels.get(message.guild!.settings.get('canales.sugerenciasbot') as string) as Channel).type.localeCompare('text')) {
			return message.send('Por favor, reestablezca un canal, ya que éste ha sido borrado o no puedo mandar mensajes en él.');
		}

		const canal = message.guild!.channels.get(message.guild!.settings.get('canales.sugerenciasbot') as string) as TextChannel;

		const titulodescf = `${titulodesc.join(' ')}`;

		const partes = titulodescf.split('|');

		const titulo = partes[0];

		let desc = '';

		let i;

		if (partes.length > 2) {
			desc += partes[1];
			for (i = 2; i < partes.length; i++) {
				desc = `${desc}|${partes[i]}`;
			}
		} else {
			desc += partes[1];
		}

		if (!canal || canal.postable === false) {
			return message.send('Por favor, reestablezca un canal, ya que éste ha sido borrado o no puedo mandar mensajes en él.');
		}

		const embedSugerencia = new MessageEmbed()
			.setColor(0x3785df)
			.setAuthor(message.author!.username, message.author!.avatarURL() as string)
			.setTitle(`${titulo}`)
			.setURL('http://gamedev.es')
			.setDescription(`${desc}`)
			.setFooter(`ID: ${message.id}`);

		await canal.send('Nueva sugerencia recibida:');
		await canal.send({ embed: embedSugerencia }).then(async message => {
			await message.react('373220533715730432');
			await message.react('373211513324044289');
			await message.react('373211513231638538');
		});

		await message.delete({ timeout: 2000 });

		return true;
	}

}
