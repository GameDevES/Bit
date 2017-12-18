const Comando = require('../../estructuras/Comando');
const Discord = require('discord.js');
var MessageVar0 = [];
var MessageVar1 = [];
var MessageVar2 = [];
var MessageVar3 = [];
var MessageVar4 = [];
var MessageVar5 = [];
var CollectedVar = [];
var mensajeInicio = [];
var res = [];

module.exports = class extends Comando {

    constructor(...args) {
        super(...args, {
            name: 'crear',
            enabled: true,
            runIn: ['text'],
            cooldown: 3,
            requiredSettings: ['perfiles'],
            description: 'Crea una carta de presentación de un proyecto/perfil que se enviará al canal #proyectos / #perfiles, para cancelar una entrevista escribe: cancelar',
            usage: '<tipo:str> [...]',
            extendedHelp: '+crear proyecto',
            comando: '+crear <proyecto/perfil>'
        });
    }
    async run(msg, [...tipo]) {
            const canal = msg.guild.channels.get(msg.guild.configs.perfiles);
            const canalp = msg.guild.channels.get(msg.guild.configs.proyectos);

            if(tipo == 'proyecto') {
                res[msg.author.id] = msg.channel.send("¡Hola! soy Bit. Responde a las siguientes preguntas para rellenar tu carta de presentación de proyecto.").then(message => writeMensajeInicio(message, msg.author));
    			msg.channel.send(msg.author + ` Nombre de proyecto:`).then(message => {writeCollectedVar(message, msg.author);});

                const filter = m => m.author.id === msg.author.id;

                await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar0(collected.last().content, msg.author); collected.last().delete();});

                if(MessageVar0[msg.author.id] == 'cancelar') {
                    msg.channel.send(msg.author + ` Ha cancelado el proyecto.`);
                    return true;
                } else {
                    CollectedVar[msg.author.id].delete();
                    res[msg.author.id].then(message => message.delete());
                }

                msg.channel.send(msg.author + ` ¿Qué roles buscas?:`).then(message => {writeCollectedVar(message, msg.author);});

                await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar1(collected.last().content, msg.author); collected.last().delete();});

                if(MessageVar1[msg.author.id] == 'cancelar') {
                    msg.channel.send(msg.author + ` Ha cancelado el proyecto.`);
                    return true;
                } else {
                    CollectedVar[msg.author.id].delete();
                }

                msg.channel.send(msg.author + ` Tamaño máximo del equipo:`).then(message => {writeCollectedVar(message, msg.author);});

                await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar2(collected.last().content, msg.author); collected.last().delete();});

                if(MessageVar2[msg.author.id] == 'cancelar') {
                    msg.channel.send(msg.author + ` Ha cancelado el proyecto.`);
                    return true;
                } else {
                    CollectedVar[msg.author.id].delete();
                }

                msg.channel.send(msg.author + ` Compensación:`).then(message => {writeCollectedVar(message, msg.author);});

                await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar3(collected.last().content, msg.author); collected.last().delete();});

                if(MessageVar3[msg.author.id] == 'cancelar') {
                    msg.channel.send(msg.author + ` Ha cancelado el proyecto.`);
                    return true;
                } else {
                    CollectedVar[msg.author.id].delete();
                }

                msg.channel.send(msg.author + ` Responsabilidades:`).then(message => {writeCollectedVar(message, msg.author);});

                await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar4(collected.last().content, msg.author); collected.last().delete();});

                if(MessageVar4[msg.author.id] == 'cancelar') {
                    msg.channel.send(msg.author + ` Ha cancelado el proyecto.`);
                    return true;
                } else {
                    CollectedVar[msg.author.id].delete();
                }

                msg.channel.send(msg.author + ` Descripción del proyecto:`).then(message => {writeCollectedVar(message, msg.author);});

                await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar5(collected.last().content, msg.author); collected.last().delete();});

                if(MessageVar5[msg.author.id] == 'cancelar') {
                    msg.channel.send(msg.author + ` Ha cancelado el proyecto.`);
                    return true;
                } else {
                    CollectedVar[msg.author.id].delete();
                }

                const embedEncuesta = new Discord.MessageEmbed()
                  .setColor(0xee4646)
                  .setTitle(`PRESENTACION DE PROYECTO`)
                  .setURL("http://gamedev.es")
                  .setTimestamp(new Date())
                  .setFooter(`gamedev.es`)
                  .setThumbnail(msg.author.avatarURL())
                  .addField(`Usuario`, msg.author)
                  .addField(`Nombre del proyecto:`, MessageVar0[msg.author.id])
                  .addField(`Descripción:`, MessageVar5[msg.author.id])
                  .addField(`Roles que busco: `, MessageVar1[msg.author.id])
                  .addField(`Tamaño máximo del equipo: `, MessageVar2[msg.author.id])
                  .addField(`Compensación: `, MessageVar3[msg.author.id])
                  .addField(`Responsabilidades:`, MessageVar4[msg.author.id])
                  .setAuthor(msg.author);

                canalp.send(embedEncuesta).then(message => {message.react("\uD83D\uDD90")});
                msg.channel.send(msg.author + " Tu proyecto ha sido enviado a " + canalp + ".").then(message => writeCollectedVar(message, msg.author));

                CollectedVar[msg.author.id].delete(10000);
            } else if (tipo == 'perfil') {
                res[msg.author.id] = msg.channel.send("¡Hola! soy Bit. Responde a las siguientes preguntas para rellenar tu carta de presentación de perfil profesional.");
                msg.channel.send(msg.author + ` Nombre:`).then(message => {writeCollectedVar(message, msg.author);});

                const filter = m => m.author.id === msg.author.id;

                await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar0(collected.last().content, msg.author); collected.last().delete();});

                if(MessageVar0[msg.author.id] == 'cancelar') {
                    msg.channel.send(msg.author + ` Ha cancelado el perfil.`);
                    return true;
                } else {
                    CollectedVar[msg.author.id].delete();
                    res[msg.author.id].then(message => message.delete());
                }

                msg.channel.send(msg.author + ` Edad:`).then(message => {writeCollectedVar(message, msg.author);});

                await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar1(collected.last().content, msg.author); collected.last().delete();});

                if(MessageVar1[msg.author.id] == 'cancelar') {
                    msg.channel.send(msg.author + ` Ha cancelado el perfil.`);
                    return true;
                } else {
                    CollectedVar[msg.author.id].delete();
                }

                msg.channel.send(msg.author + ` ¿Cuál es tu especialidad?:`).then(message => {writeCollectedVar(message, msg.author);});

                await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar2(collected.last().content, msg.author); collected.last().delete();});

                if(MessageVar2[msg.author.id] == 'cancelar') {
                    msg.channel.send(msg.author + ` Ha cancelado el perfil.`);
                    return true;
                } else {
                    CollectedVar[msg.author.id].delete();
                }

                msg.channel.send(msg.author + ` ¿Qué experiencia tienes?:`).then(message => {writeCollectedVar(message, msg.author);});

                await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar3(collected.last().content, msg.author); collected.last().delete();});

                if(MessageVar3[msg.author.id] == 'cancelar') {
                    msg.channel.send(msg.author + ` Ha cancelado el perfil.`);
                    return true;
                } else {
                    CollectedVar[msg.author.id].delete();
                }

                msg.channel.send(msg.author + ` ¿Qué tipo de proyectos buscas?:`).then(message => {writeCollectedVar(message, msg.author);});

                await msg.channel.awaitMessages(filter, { max: 1}).then(collected => {writeMessageVar4(collected.last().content, msg.author); collected.last().delete();});

                if(MessageVar4[msg.author.id] == 'cancelar') {
                    msg.channel.send(msg.author + ` Ha cancelado el perfil.`);
                    return true;
                } else {
                    CollectedVar[msg.author.id].delete();
                }

                const embedEncuesta2 = new Discord.MessageEmbed()
                  .setColor(0xee4646)
                  .setTitle(`PERFIL PROFESIONAL`)
                  .setURL("http://gamedev.es")
                  .setTimestamp(new Date())
                  .setFooter(`gamedev.es`)
                  .setThumbnail(msg.author.avatarURL())
                  .addField(`Usuario:`, msg.author)
                  .addField(`Nombre:`, MessageVar0[msg.author.id])
                  .addField(`Edad:`, MessageVar1[msg.author.id])
                  .addField(`Mi especialidad: `, MessageVar2[msg.author.id])
                  .addField(`Experiencia: `, MessageVar3[msg.author.id])
                  .addField(`Tipos de proyectos que busco: `, MessageVar4[msg.author.id])
                  .setAuthor(msg.author);

                canal.send(embedEncuesta2);
                msg.channel.send(msg.author + " Tu proyecto ha sido enviado a " + canal + ".").then(message => writeCollectedVar(message, msg.author));

                CollectedVar[msg.author.id].delete(10000);
            } else {
                await msg.channel.send("El tipo tiene que ser 'proyecto' o 'perfil'");
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
function writeCollectedVar(collected, messageAuthor) {
    CollectedVar[messageAuthor.id] = collected;
}
function writeMensajeInicio(collected, messageAuthor) {
    mensajeInicio[messageAuthor.id] = collected;
}