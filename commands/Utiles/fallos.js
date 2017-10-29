const { Command } = require('klasa');
const Discord = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'reporte',
            runIn: ['text'],
            requiredSettings: ['reportes'],
	    permLevel: 3,
            description: 'Expone un fallo para que lo podamos solucionar, (se te enviara un mensaje si se resuelve).',
            usage: '<titulodesc:str> [...]',
            usageDelim: ' '
        });
    }


    async run(msg, [...titulodesc]) {
        const canal = msg.guild.channels.get(msg.guild.settings.reportes);

        titulodesc = `${titulodesc.join(' ')}`;

        var partes = titulodesc.split('|');

        const titulo = partes[0];

        const desc = partes[1];

        if (!canal || canal.postable === false)
            return msg.send('Por favor, reestablezca un canal, ya que éste ha sido borrado o no puedo mandar mensajes en él.');

        const embedReporte = new Discord.MessageEmbed()
        .setColor(0x3785df)
        .setAuthor(msg.author.username, msg.author.avatarURL)
        .setTitle(`${titulo}`)
        .setDescription(`${desc}`)
        .setFooter('ID: ' + msg.author.id);

        msg.delete(2000);
        

        canal.send('Nuevo reporte recibido:');
        return canal.send({embed : embedReporte});
    }

};