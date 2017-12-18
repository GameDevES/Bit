const Comando = require('../../estructuras/Comando');
const fs = require("fs");

module.exports = class extends Comando {

    constructor(...args) {
        super(...args, {
            name: 'separador',
            enabled: true,
            runIn: ['text'],
            cooldown: 3,
            description: 'Crea un separador.',
	    usage: '<tipo:str>'
        });
    }

    async run(msg, [...tipos]) {
        var img = ['https://trello-attachments.s3.amazonaws.com/59da529c00ea9cc5b7516cc4/59e5598fee109d46d9084f5d/f6e1dd1b7eb838721d7564fb07a36f98/bs.png',
            'https://trello-attachments.s3.amazonaws.com/59da529c00ea9cc5b7516cc4/59e5598fee109d46d9084f5d/963c5c1ba540556aeaa53f6fa4c081c7/bs2.png',
            'https://cdn.discordapp.com/attachments/360666079804260352/366634302542446594/barra_gamedev.png']
			
        if (tipos == '1') {
            msg.channel.sendFile(img[2]);
            msg.delete(100);
        } else if (tipos == '2') {
            msg.channel.sendFile(img[0]);
            msg.delete(100);
        }
        if (tipos == '3') {
            msg.channel.sendFile(img[1]);
            msg.delete(100);
        }
    } 
};
