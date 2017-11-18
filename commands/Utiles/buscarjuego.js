const Comando = require('../../estructuras/Comando');
const Discord = require('discord.js');

module.exports = class extends Comando {

    constructor(...args) {
        super(...args, {
            name: 'buscarjuego',
            enabled: true,
            runIn: ['text'],
            description: 'Busca un juego en la base de datos de Bit.',
            usage: '<Nombrea:str>',
            extendedHelp: '+buscarjuego Zelda Breath of the Wild',
            comando: '+buscarjuego <Nombre>'
        });
    }
    async run(msg, [...Nombrea]) {

        var autor = null;
        var embedJuego = null;
              
    	const MySql = this.client.providers.get('MySQL');

        const resultado = await MySql.get("Juegos", "nombre", `${Nombrea}`);

        console.log(resultado);

        if (typeof resultado == "undefined") {
            msg.channel.send("El Nombre de ese juego no existe en la base de datos");
        } else {

            embedJuego = new Discord.MessageEmbed()
            .setColor(0xee4646)
            .setTitle("**__" + resultado.Nombre.toUpperCase() + "__**")
            .setTimestamp(new Date())
            .setFooter(`gamedev.es`)
            .setURL("http://www.gamedev.es")
            .addField("**Género:**", resultado.Genero)
            .addField("**Descripcion:**", resultado.Descripcion)
            .addField("**Desarrolador:**", resultado.Autor)
            .addField("**Fecha de lanzamiento:**", resultado.Fecha)
            .addField("**Sitio web:**", resultado.WEB)
            .addField("**__Descargar__:**", resultado.URL);

            msg.channel.send(embedJuego);
        }
	  
		await msg.delete(100);

        return true;

  }
};