const { Command, util } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'sugerencia',
            enabled: true,
            runIn: ['text'],
			requiredSettings: ['SugerenciasBot'],
            permLevel: 0,
            description: 'Pone una sugerencia en el canal que hallas selceccionado en la configuración.',
            usage: '<titulo:str>  <desc:str>'
        });
    }
	

    async run(msg, [titulo, ...desc]) {
        const Sugerencias = msg.guild.settings.SugerenciasBot;
		
		return msg.guild.channels.get(Sugerencias).send(':heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: \n **Titulo:** ' + titulo + '\n \n **Descripcion:** ' + desc + '\n \n :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: ');
    }

};