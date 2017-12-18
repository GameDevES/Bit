const Comando = require('../../estructuras/Comando');
const Discord = require('discord.js');
const { RichMenu } = require('klasa');

module.exports = class extends Comando {

    constructor(...args) {
        super(...args, {
            name: 'listajuegos',
            enabled: true,
            runIn: ['text'],
            description: 'Busca un juego en la base de datos de Bit.',
            usage: '',
            extendedHelp: '+listajuegos',
            comando: '+listajuegos'
        });
    }
    async run(msg) {

        var autor = null;
        var embedJuego = null;

        const filter = m => m.author.id === msg.author.id;
              
        const MySql = this.client.providers.get('MySQL');

        const resultado = await MySql.getAll2("Juegos", "nombre");

        if (typeof resultado == "undefined") {
            msg.channel.send("No existe ningun juego");

            await msg.delete(100);

            return true;
        } else {

            
            const display = new RichMenu(new this.client.methods.Embed()
            .setColor(0xee4646)
            .setTitle("**__LISTA DE JUEGOS__**")
            .setURL("http://www.gamedev.es")
            .setDescription("Comando ejecutado por " + msg.author)).setEmojis({stop: '❌'});

            for(let i = 0; i < resultado.length; i++) {
                display.addOption(resultado[i].Nombre, resultado[i].Genero);
            }
        
            await msg.delete(100);

            const displayCollector = await display.run(await msg.channel.send('Cargando lista'), { filter: (reaction, user) => user === msg.author, time: 60000, stop: '❌' });

            const eleccion = await displayCollector.selection;
            if (eleccion === null) {
                return displayCollector.message.delete();
            }

            const NombreSeleccion = display.options[eleccion].name;

            const resultado2 = await MySql.get("Juegos", "nombre", `${NombreSeleccion}`);

            msg.channel.send(new this.client.methods.Embed()
                .setColor(0xee4646)
                .setTitle(`**__` + resultado2.Nombre.toUpperCase() + `__**`)
                .setTimestamp(new Date())
                .setFooter(`gamedev.es`)
                .setURL("http://www.gamedev.es")
                .addField("**Género:**", resultado2.Genero)
                .addField("**Descripcion:**", resultado2.Descripcion)
                .addField("**Desarrollador:**", resultado2.Autor)
                .addField("**Fecha de lanzamiento:**", resultado2.Fecha)
                .addField("**Sitio web:**", resultado2.WEB)
                .addField("**__Descargar__:**", resultado2.URL)
            );
            
            return displayCollector.message.delete();

        }
    }
};
function shortenString(source_string, max_length) {
    var short = source_string.substr(0, max_length);
    if (/^\S/.test(source_string.substr(max_length)))
        return short.replace(/\s+\S*$/, "") + '...';
    return short;
};