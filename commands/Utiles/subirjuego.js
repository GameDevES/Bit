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
var CollectedVar1 = [];
var CollectedVar2 = [];
var CollectedVar3 = [];
var res = [];

module.exports = class extends Comando {

    constructor(...args) {
        super(...args, {
            name: 'subirjuego',
            enabled: true,
            runIn: ['text'],
            description: 'Subir un juego a la base de datos de Bit. Escribe "cancelar" para cancelar la subida del juego.',
            extendedHelp: '+subirjuego',
            comando: '+subirjuego'
        });
    }
    async run(msg, [...Nombrea]) {

      var autor = null;
      var embedJuego = null;
          
	  const MySql = this.client.providers.get('MySQL');

	    res[msg.author.id] = msg.channel.send("�Hola! soy Bit. Responde a las siguientes preguntas para subir un juego a mi base de datos.");
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
                msg.channel.send(msg.author + ` URL de descarga del juego:`).then(message => {writeCollectedVar1(message, msg.author);});
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
                msg.channel.send(msg.author + ` Sitio Web:`).then(message => {writeCollectedVar1(message, msg.author);});
                await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar3(collected.last().content, msg.author); collected.last().delete();});
                if(MessageVar3[msg.author.id] == 'cancelar') {
                    msg.channel.send(msg.author + ` Ha cancelado la subida.`);
                    return true;
                }
                CollectedVar1[msg.author.id].delete();
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
            if(validarFormatoFecha(MessageVar5[msg.author.id])){
                if(existeFecha(MessageVar5[msg.author.id])){
                }else{
                      while(existeFecha(MessageVar5[msg.author.id]) != true && validarFechaMenorActual(MessageVar5[msg.author.id]) != true) {
                        msg.channel.send("La fecha no existe o todavia no ha llegado, tiene que ser una fecha menor o igual a la de hoy.").then(message => {writeCollectedVar1(message, msg.author)});
                        msg.channel.send(msg.author + ` Fecha de lanzamiento:`).then(message => {writeCollectedVar3(message, msg.author);});
                        await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar5(collected.last().content, msg.author); collected.last().delete();});
                        CollectedVar1[msg.author.id].delete();
                        CollectedVar3[msg.author.id].delete();
                      }
                }
            }else{
                while(validarFormatoFecha(MessageVar5[msg.author.id]) != true || existeFecha(MessageVar5[msg.author.id]) != true) {
                    msg.channel.send("El formato o la fecha son incorrectos: el formato tiene que ser dd/mm/yyyy.").then(message => {writeCollectedVar2(message, msg.author)});
                    msg.channel.send(msg.author + ` Fecha de lanzamiento:`).then(message => {writeCollectedVar3(message, msg.author);});
                    await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar5(collected.last().content, msg.author); collected.last().delete();});
                    CollectedVar2[msg.author.id].delete();
                    CollectedVar3[msg.author.id].delete();
                }
            }
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
function writeCollectedVar1(collected, messageAuthor) {
    CollectedVar1[messageAuthor.id] = collected;
};
function writeCollectedVar2(collected, messageAuthor) {
    CollectedVar2[messageAuthor.id] = collected;
};
function writeCollectedVar3(collected, messageAuthor) {
    CollectedVar3[messageAuthor.id] = collected;
};
function existeFecha (fecha) {
    var fechaf = fecha.split("/");
    var d = fechaf[0];
    var m = fechaf[1];
    var y = fechaf[2];
    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}
function validarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if ((campo.match(RegExPattern)) && (campo!='')) {
          return true;
    } else {
          return false;
    }
};
function validarFechaMenorActual(date){
    var x=new Date();
    var fecha = date.split("/");
    x.setFullYear(fecha[2],fecha[1]-1,fecha[0]);
    var today = new Date();

    if (x >= today)
      return false;
    else
      return true;
};