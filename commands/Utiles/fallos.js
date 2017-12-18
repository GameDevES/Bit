const Comando = require('../../estructuras/Comando');
const Discord = require('discord.js');

module.exports = class extends Comando {

    constructor(...args) {
        super(...args, {
            name: 'reporte',
            runIn: ['text'],
            requiredSettings: ['reportes'],
	        permLevel: 3,
            description: 'Recoge un reporte creando un ticket automático en el canal de reportes. Puede ser de un fallo, una duda, un reporte a un usuario.',
            usage: '<titulodesc:str> [...]',
            usageDelim: ' ',
            extendedHelp: '+reporte Fallo en la web | Al hacer click en el botón "Inicio" la página muestra un error 404 no encontrado.',
            comando: '+reporte <Título> | <Descripción>',
            opcional: ['```md',
                         `* Los reportes no son privados.`,
                         '```']
        });
    }


    async run(msg, [...titulodesc]) {
        const canal = msg.guild.channels.get(msg.guild.configs.reportes);

        const MySQL = await this.client.providers.get('MySQL');

        titulodesc = `${titulodesc.join(' ')}`;

        var partes = titulodesc.split('|');

        const titulo = partes[0];

        const desc = partes[1];

        if (!canal || canal.postable === false)
            return msg.send('Por favor, reestablezca un canal, ya que éste ha sido borrado o no puedo mandar mensajes en él.');
        console.log(msg.id);
        if(MySQL.insert2("Fallos", ['UserID', 'Title', 'Desc', 'MsgID'], [`${msg.author.id}`, `${titulo}`, `${desc}`, `${msg.id}`])) {
            var ID = await MySQL.getAll2("Fallos", "ID");
            ID = ID.length;
            const embedReporte = new Discord.MessageEmbed()
            .setColor(0x3785df)
            .setAuthor(msg.author.username, msg.author.avatarURL)
            .setTitle(`${titulo}`)
            .setDescription(`${desc}`)
            .addField(`Este reporte todavia tiene que ser evaluado`, ` ID: ` + ID)
            .setFooter(msg.id);
            
            msg.send("Tu reporte se ha subido, ahora tiene que ser evaluado");
            canal.send('Nuevo reporte recibido:');
            msg.delete(2000);
            return canal.send({embed : embedReporte});
        } else {
            msg.send("La subida del reporte ha fallado, por favor contacta con un administrador/desarrollador.");
        }

        msg.delete(2000);
    }

};