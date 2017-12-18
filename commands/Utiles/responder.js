const Comando = require('../../estructuras/Comando');
const Discord = require('discord.js');

module.exports = class extends Comando {

    constructor(...args) {
        super(...args, {
            name: 'responder',
            requiredSettings: ['reportes'],
            permLevel: 4,
            description: 'Responde a un fallo que se ha solucionando dando una descripción y la id del mensaje.',
            usage: '<idmensaje:str>  <desc:str> [...]',
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

        const message = await canal.messages.fetch(idmensaje);

        const embedRespuesta = new Discord.MessageEmbed()
            .setColor(0x3785df)
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle(message.embeds[0].title)
            .setDescription(`${desc.join(' ')}`)

        if (message.author.id !== this.client.user.id
            || message.embeds.length !== 1
            || message.embeds[0].footer === null
            || /ID: \d{17,19}/.test(message.embeds[0].footer.text) === false)
            throw 'Este mensaje no pertenece a un reporte válido.';

        const userid = /ID: (\d{17,19})/.exec(message.embeds[0].footer.text)[1];
        const user = await this.client.users.fetch(userid);

        message.react("✔");

        return user.send(embedRespuesta);
    }

};