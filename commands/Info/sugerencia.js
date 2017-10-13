const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'sugerencia',
            runIn: ['text'],
            requiredSettings: ['SugerenciasBot'],
            description: 'Pone una sugerencia en el canal que hallas selceccionado en la configuración.',
            usage: '<titulo:str>  <desc:str> [...]',
            usageDelim: ' '
        });
    }


    async run(msg, [titulo, ...desc]) {
        const canal = msg.guild.channels.get(msg.guild.settings.SugerenciasBot);

        if (!canal || canal.postable === false)
            return msg.send('Por favor, reestablezca un canal, ya que éste ha sido borrado o no puedo mandar mensajes en él.');

        return canal.send(`➖➖➖\n**Titulo:** ${titulo}\n\n**Descripcion:** ${desc.join(' ')}\n\n ➖➖➖`);
    }

};
