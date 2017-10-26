const { Command } = require('klasa');
const Discord = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'sugerencia',
            runIn: ['text', 'dm', 'group'],
            permLevel: 6,
            requiredSettings: ['SugerenciasBot'],
            description: 'Escribe una sugerencia en el canal que hallas selceccionado en la configuración.',
            extendedHelp: 'Tienes que poner | para separar el título de la descripción.',
            usage: '<titulodesc:str> [...]',
            usageDelim: ' '
        });
    }


    async run(msg, [...titulodesc]) {
        const canal = msg.guild.channels.get(msg.guild.settings.SugerenciasBot);

        titulodesc = `${titulodesc.join(' ')}`;

        var partes = titulodesc.split('|');

        const titulo = partes[0];
		
		var desc = "";
		
		var i;
		
		if(partes.length > 2) {
			desc = desc + partes[1];
			for(i = 2; i < partes.length; i++) {
				desc = desc + "|" + partes[i];
			}
		} else {
			desc = partes[1];
		}

        

        if (!canal || canal.postable === false)
            return msg.send('Por favor, reestablezca un canal, ya que éste ha sido borrado o no puedo mandar mensajes en él.');

        const embedSugerencia = new Discord.MessageEmbed()
        .setColor(0x3785df)
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setTitle(`${titulo}`)
		.setURL("http://gamedev.es")
        .setDescription(`${desc}`)
        .setFooter('ID: ' + msg.id);

        msg.delete(2000);

        canal.send('Nueva sugerencia recibida:');
        return canal.send({embed : embedSugerencia});
        //**Tu reporte ha sido solucionado:** \n ${desc.join(' ')}\n`
   }

};
