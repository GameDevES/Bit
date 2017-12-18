const Comando = require('../../estructuras/Comando');
const Discord = require('discord.js');

module.exports = class extends Comando {

    constructor(...args) {
        super(...args, {
            name: 'eliminarjuego',
            enabled: true,
            runIn: ['text'],
	        permLevel: 4,
            description: 'Elimina un juego de la base de datos de Bit.',
            usage: '<Nombrea:str>',
            extendedHelp: '+eliminarjuego Zelda Breath of the Wild',
            comando: '+eliminarjuego <Nombre>'
        });
    }
    async run(msg, [...Nombrea]) {

        var autor = null;
        var embedJuego = null;
              
    	const MySql = this.client.providers.get('MySQL');

        const resultado = await MySql.delete2("Juegos", `${Nombrea}`);

        console.log(resultado);

        if (typeof resultado == "undefined") {
            msg.channel.send("El Nombre de ese juego no existe en la base de datos");
        } else {
            msg.channel.send("El juego " + Nombrea + " ha sido eliminado");
        }
	  
		await msg.delete(100);

        return true;

  }
};