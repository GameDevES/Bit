const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'fallo',
            runIn: ['text'],
            requiredSettings: ['SugerenciasBot'],
            description: 'Expone un fallo para que lo podamos solucionar, (se te enviara un mensaje si se resuelve).',
            usage: '<titulo:str>  <desc:str> [...]',
            usageDelim: ' '
        });
    }


    async run(msg, [titulo, ...desc]) {
        const canal = msg.guild.channels.get(msg.guild.settings.reportes);

        if (!canal || canal.postable === false)
            return msg.send('Por favor, reestablezca un canal, ya que éste ha sido borrado o no puedo mandar mensajes en él.');

        return canal.send(msg.author + `Ha enviado un reporte: \n` + `**Titulo:** ${titulo}\n\n**Descripcion:** ${desc.join(' ')}\n`);
    }

};