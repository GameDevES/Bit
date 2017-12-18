const Comando = require('../../estructuras/Comando');
const Discord = require('discord.js');

const bot = require("./../../bot");

module.exports = class extends Comando {

    constructor(...args) {
        super(...args, {
            name: 'sugerencia',
            runIn: ['text', 'dm', 'group'],
            permLevel: 3,
            requiredSettings: ['SugerenciasBot'],
            description: 'Escribe una sugerencia en el canal que hallas selceccionado en la configuración.',
            extendedHelp: '+sugerencia Titulo | Descripción',
            usage: '<titulodesc:str> [...]',
            usageDelim: ' ',
            comando: '+sugerencia  <Titulo> | <Descripción>'
        });
    }


    async run(msg, [...titulodesc]) {
		if(bot.mantBot == false) {
        const canal = msg.guild.channels.get(msg.guild.configs.SugerenciasBot);

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
		canal.send({embed : embedSugerencia}).then(async function(message){ await message.react("373220533715730432"),
									await message.react("373211513324044289"),
									await message.react("373211513231638538")});
		
		
		
        return true;
        //**Tu reporte ha sido solucionado:** \n ${desc.join(' ')}\n`
		}else {
			msg.delete(1000);
			console.log(bot.mant);
			return msg.send("El bot está en mantenimiento, espere a que este activo de nuevo.");
		}
   }

};
