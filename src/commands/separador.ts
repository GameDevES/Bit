import { BitCommand } from '../utils/BitCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { MessageAttachment, Channel} from 'discord.js';
import { Canvas } from 'canvas-constructor';
import fsn = require('fs-nextra');

export default class extends BitCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			name: 'separador',
			cooldown: 3,
			description: 'Genera automáticamente un separador.',
			extendedHelp: '+separador 1 o 2.',
			usage: '<numerosep:num> [...]',
			usageDelim: ''
		});
	}

	public async run(message: KlasaMessage, [...numerosep]: [number]) {
		if ((message.guild?.channels.get(message.guild.settings.get('canales.sugerenciasbot') as string) as Channel).type.localeCompare('text')) {
			return message.send('Por favor, reestablezca un canal, ya que éste ha sido borrado o no puedo mandar mensajes en él.');
		}
        const canal = message

        const numerosepf: number = +`${numerosep.join()}`;
		if(numerosepf < 3 && numerosepf !> 0 )
		{
        const image = await fsn.readFile('./img/separadores/Separador_'+ numerosepf +'.png');
        // Creación del canvas. º
        const canvas:Canvas = new Canvas(400,39)
        canvas.addImage(image,0,0,400,39)
        canvas.setColor('#FFAE23')
        canvas.setTextFont('28px Impact')
        canvas.toBuffer();
        const attachment:MessageAttachment = new MessageAttachment(canvas.toBuffer());
        
        /*
		

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
			.setAuthor(message.author.username, message.author.avatarURL() as string)
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
        
        */
        
        await canal.send(attachment);
		await message.delete({ timeout: 2000 });
		}else
		{
		await canal.send('Solo puedes usar el separador 1 & 2.');	
		await message.delete();
		}
		return true;
	}

}
