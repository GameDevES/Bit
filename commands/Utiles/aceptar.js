const Comando = require('../../estructuras/Comando');
const Discord = require('discord.js');

module.exports = class extends Comando {

    constructor(...args) {
        super(...args, {
            name: 'aceptar',
            requiredSettings: ['reportes'],
            permLevel: 4,
            description: 'Responde a un fallo que se ha solucionando dando una descripción y la id del mensaje.',
            usage: '<idmensaje:int>  <desc:str> [...]',
            usageDelim: ' ',
            extendedHelp: '+responder 378947583628938 tu reporte ha sido solucionado',
            comando: '+responder <idMensaje> <Descripción>',
            admins: true
        });
    }


    async run(msg, [idmensaje, ...desc]) {
        const canal = msg.guild.channels.get(msg.guild.configs.reportes);
        if (!canal || canal.postable === false)
            return msg.send('Por favor, reestablezca un canal, ya que éste ha sido borrado o no puedo mandar mensajes en él.');

        const MySql = await this.client.providers.get('MySQL');

        if(MySql.get("Fallos", "ID", idmensaje)){}
        else {
            return msg.send("El ID del reporte no es valido");
        }

        const messag = await MySql.get("Fallos", "ID", idmensaje);
        if (messag.Aceptado == "0") {
            const user = await this.client.users.fetch(""+ messag.UserID);
            if (messag.NumApp == "5") {
                const embedRespuesta = new Discord.MessageEmbed()
                    .setColor(0x3785df)
                    .setAuthor(user.username, user.avatarURL())
                    .setTitle(messag.Title)
                    .setDescription(messag.Desc)
                    .addField("Tu fallo ha sido aceptado, se te avisara cuando este solucionado");

                user.send(embedRespuesta);
                MySql.update("Fallos", parseInt(idmensaje), "Aceptado", "1");
            }

            var mcg = canal.messages.array();
            var mv = null;
            for(let i = 0; i < mcg.length; i++) {
                if((i + 1) % 2) {
                } else {
                    if(mcg[i].embeds[0].footer.text == messag.MsgID) {
                        
                        mv = mcg[i];
                    }
                }
                
            }
            console.log("" + (parseInt(messag.NumApp) + 1));
            MySql.update("Fallos", parseInt(idmensaje), "NumApp", (messag.NumApp + 1));
            msg.delete(1000);
            return mv.edit(new Discord.MessageEmbed().setColor(0x3785df)
            .setAuthor(user.username, user.avatarURL())
            .setTitle(messag.Title)
            .setDescription(messag.Desc)
            .addField("Aceptado", `ID: ` + idmensaje)
            .setFooter(messag.MsgID));
        } else {
            msg.send("El reporte ya ha sido aceptado, para darlo por solucionado escriba +");
            return msg.delete(1000);
        }
    }

};