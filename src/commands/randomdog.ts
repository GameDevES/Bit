import { BitCommand } from '../utils/BitCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { MessageAttachment } from 'discord.js';
import { Canvas } from 'canvas-constructor';
//Nueva lib
import fsn = require('fs-nextra');


export default class extends BitCommand {
    public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			name: 'randomdog',
			cooldown: 5,
			description: 'guaf guaf',
			extendedHelp: '+randomdog',
			usage: '',
			usageDelim: ' '
        });
    }
        public async run(message: KlasaMessage, []: [string]) {

            const canal = message
            //const activados = (message.guild?.settings.get('canales.activados') as string[]).map(channel => message.guild?.channels.get(channel)) as TextChannel[];
            let randomNumber: number= Math.floor(Math.random() * 30) + 1 ;

            const image = await fsn.readFile('./img/dog/'+ randomNumber + '.jpg');
            const canvas:Canvas = new Canvas(350,350)
            
                canvas.setColor('#AEFD54')
                canvas.addImage(image,0,0,350,350)
                canvas.setColor('#FFAE23')
                canvas.setTextFont('28px Impact')
                canvas.addText('Hello World!', 130, 150)
                canvas.toBuffer();
                const attachment:MessageAttachment = new MessageAttachment(canvas.toBuffer());


            
            //await canal.send(randomNumber);
            await canal.send(attachment);
            //await canal.send({file: '../img/test.png'});
    
            //await message.delete({ timeout: 2000 });
            return true;
        }
}