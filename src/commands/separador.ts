import { BitCommand } from '../utils/BitCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { MessageAttachment, Channel } from 'discord.js';
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
		const canal = message;
		const numerosepf: number = +`${numerosep.join()}`;
		if (numerosepf < 3 && numerosepf ! > 0 ) {
			const image = await fsn.readFile('./img/separadores/Separador_' + numerosepf + '.png');
			// Creación del canvas.
			const canvas: Canvas = new Canvas(400,39)
		canvas.addImage(image,0,0,400,39)
		canvas.setColor('#FFAE23')
		canvas.setTextFont('28px Impact')
		canvas.toBuffer();
        const attachment:MessageAttachment = new MessageAttachment(canvas.toBuffer());
        
        
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
