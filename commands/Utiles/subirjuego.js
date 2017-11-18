const Comando = require('../../estructuras/Comando');
const Discord = require('discord.js');
const validUrl = require('valid-url');

var MessageVar0 = [];
var MessageVar1 = [];
var MessageVar2 = [];
var MessageVar3 = [];
var MessageVar4 = [];
var MessageVar5 = [];
var MessageVar6 = [];
var CollectedVar = [];
var CollectedVar2 = [];
var res = [];

module.exports = class extends Comando {

    constructor(...args) {
        super(...args, {
            name: 'subirjuego',
            enabled: true,
            runIn: ['text'],
            description: 'Crea y sube un juego a la base de datos de Bit.',
            extendedHelp: '+crearjuego',
            comando: '+crearjuego'
        });
    }
    async run(msg, [...Nombrea]) {

      var autor = null;
      var embedJuego = null;
          
	  const MySql = this.client.providers.get('MySQL');

	    res[msg.author.id] = msg.channel.send("¡Hola! soy Bit. Responde a las siguientes preguntas para subir un juego a mi base de datos.");
        msg.channel.send(msg.author + ` Nombre del juego:`).then(message => {writeCollectedVar(message, msg.author);});

        const filter = m => m.author.id === msg.author.id;

        await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar0(collected.last().content, msg.author); collected.last().delete();});

        if(MessageVar0[msg.author.id] == 'cancelar') {
            msg.channel.send(msg.author + ` Ha cancelado la subida.`);
            return true;
        } else {
            CollectedVar[msg.author.id].delete();
            res[msg.author.id].then(message => message.delete());
        }

        msg.channel.send(msg.author + ` Descripcion del juego:`).then(message => {writeCollectedVar(message, msg.author);});

        await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar1(collected.last().content, msg.author); collected.last().delete();});

        if(MessageVar1[msg.author.id] == 'cancelar') {
            msg.channel.send(msg.author + ` Ha cancelado la subida.`);
            return true;
        } else {
            CollectedVar[msg.author.id].delete();
        }

        msg.channel.send(msg.author + ` URL de descarga del juego:`).then(message => {writeCollectedVar(message, msg.author);});

        await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar2(collected.last().content, msg.author); collected.last().delete();});

        if(MessageVar2[msg.author.id] == 'cancelar') {
            msg.channel.send(msg.author + ` Ha cancelado la subida.`);
            return true;
        } else if (typeof validUrl.isUri(MessageVar2[msg.author.id]) == "undefined") {
            while(typeof validUrl.isUri(MessageVar2[msg.author.id]) == "undefined") {
                msg.channel.send("La URL tiene que ser valida").then(message => {writeCollectedVar2(message, msg.author);});
                msg.channel.send(msg.author + ` URL de descarga del juego:`).then(message => {writeCollectedVar(message, msg.author);});
                await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar2(collected.last().content, msg.author); collected.last().delete();});
                if(MessageVar2[msg.author.id] == 'cancelar') {
                    msg.channel.send(msg.author + ` Ha cancelado la subida.`);
                    return true;
                }
                CollectedVar[msg.author.id].delete();
                CollectedVar2[msg.author.id].delete();
            }
        } else {
            CollectedVar[msg.author.id].delete();
        }

        msg.channel.send(msg.author + ` Sitio Web:`).then(message => {writeCollectedVar(message, msg.author);});

        await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar3(collected.last().content, msg.author); collected.last().delete();});

        if(MessageVar3[msg.author.id] == 'cancelar') {
            msg.channel.send(msg.author + ` Ha cancelado la subida.`);
            return true;
        } else if (typeof validUrl.isUri(MessageVar3[msg.author.id]) == "undefined") {
            while(typeof validUrl.isUri(MessageVar3[msg.author.id]) == "undefined") {
                msg.channel.send("La URL tiene que ser valida").then(message => {writeCollectedVar2(message, msg.author);});
                msg.channel.send(msg.author + ` Sitio Web:`).then(message => {writeCollectedVar(message, msg.author);});
                await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar3(collected.last().content, msg.author); collected.last().delete();});
                if(MessageVar3[msg.author.id] == 'cancelar') {
                    msg.channel.send(msg.author + ` Ha cancelado la subida.`);
                    return true;
                }
                CollectedVar[msg.author.id].delete();
                CollectedVar2[msg.author.id].delete();
            }
        } else {
            CollectedVar[msg.author.id].delete();
        }

        msg.channel.send(msg.author + ` Género:`).then(message => {writeCollectedVar(message, msg.author);});

        await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar4(collected.last().content, msg.author); collected.last().delete();});

        if(MessageVar4[msg.author.id] == 'cancelar') {
            msg.channel.send(msg.author + ` Ha cancelado la subida.`);
            return true;
        } else {
            CollectedVar[msg.author.id].delete();
        }

        msg.channel.send(msg.author + ` Fecha de lanzamiento:`).then(message => {writeCollectedVar(message, msg.author);});

        await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar5(collected.last().content, msg.author); collected.last().delete();});

        if(MessageVar5[msg.author.id] == 'cancelar') {
            msg.channel.send(msg.author + ` Ha cancelado la subida.`);
            return true;
        } else {
            CollectedVar[msg.author.id].delete();
        }

        msg.channel.send(msg.author + ` Desarrollador:`).then(message => {writeCollectedVar(message, msg.author);});

        await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar6(collected.last().content, msg.author); collected.last().delete();});

        if(MessageVar6[msg.author.id] == 'cancelar') {
            msg.channel.send(msg.author + ` Ha cancelado la subida.`);
            return true;
        } else {
            CollectedVar[msg.author.id].delete();
        }



        console.log(validUrl.isUri(MessageVar2[msg.author.id]));

        if (await MySql.insert2("Juegos", ['Nombre', 'URL', 'Descripcion', 'Autor', 'WEB', 'Fecha', 'Genero'], [MessageVar0[msg.author.id], MessageVar2[msg.author.id], MessageVar1[msg.author.id], MessageVar6[msg.author.id], MessageVar3[msg.author.id], MessageVar5[msg.author.id], MessageVar4[msg.author.id]])) {
            msg.channel.send("Se ha subido el juego " + MessageVar0[msg.author.id] + " correctamente");
        } else {
            msg.channel.send("No se ha podido subir por que ya existe otro juego con el nombre " + MessageVar0[msg.author.id]);
        }

		await msg.delete(100);

        return true;

  }
};

function writeMessageVar0(message, messageAuthor) {
        MessageVar0[messageAuthor.id] = message;
    };
function writeMessageVar1(message, messageAuthor) {
        MessageVar1[messageAuthor.id] = message;
    };
function writeMessageVar2(message, messageAuthor) {
        MessageVar2[messageAuthor.id] = message;
    };
function writeMessageVar3(message, messageAuthor) {
        MessageVar3[messageAuthor.id] = message;
    };
function writeMessageVar4(message, messageAuthor) {
        MessageVar4[messageAuthor.id] = message;
    };
function writeMessageVar5(message, messageAuthor) {
        MessageVar5[messageAuthor.id] = message;
    };
function writeMessageVar6(message, messageAuthor) {
        MessageVar6[messageAuthor.id] = message;
    };
function writeCollectedVar(collected, messageAuthor) {
    CollectedVar[messageAuthor.id] = collected;
};
function writeCollectedVar2(collected, messageAuthor) {
    CollectedVar2[messageAuthor.id] = collected;
};