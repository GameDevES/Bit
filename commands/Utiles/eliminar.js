const Comando = require('../../estructuras/Comando');
const Discord = require('discord.js');

ListaPerfiles = [];
ListaPerfiles2 = [];

ListaProyectos = [];
ListaProyectos2 = [];

module.exports = class extends Comando {

    constructor(...args) {
        super(...args, {
            name: 'eliminar',
            enabled: true,
            runIn: ['text'],
            cooldown: 3,
            requiredSettings: ['perfiles'],
            description: 'Elimina un proyecto o un perfil a tu nombre.',
            usage: '<tipo:str> [...]',
            extendedHelp: '+eliminar proyecto',
            comando: '+eliminar <proyecto/perfil>'
        });
    }
    async run(msg,[ ...tipo]) {
        const canal = await msg.guild.channels.get(msg.guild.configs.perfiles);
        const canalp = await msg.guild.channels.get(msg.guild.configs.proyectos);

        if(tipo == "perfil") {
            msg.delete(100);

            ListaPerfiles = canal.messages.array();

            var i = 0;

            for(i = 0; i < ListaPerfiles.length; i++) {
                if(ListaPerfiles[i].embeds[0].author.name == ("<@" + msg.author.id + ">")) {
                    ListaPerfiles2[i] = ListaPerfiles[i];
                }
            }

            if(typeof ListaPerfiles2[0] == "undefined") {
                msg.channel.send("No tienes ningun perfil a tu nombre, crea uno con  `+crear perfil`.");

                return true;
            }

            ListaPerfiles2[ListaPerfiles2.length - 1].delete();

            msg.channel.send("El proyecto ha sido eliminado " + msg.author);

            return true;
        } else if (tipo == "proyecto") {
            msg.delete(100);
            
                        ListaProyectos = canalp.messages.array();
            
                        var i = 0;
            
                        for(i = 0; i < ListaProyectos.length; i++) {
                            if(ListaProyectos[i].embeds[0].author.name == ("<@" + msg.author.id + ">")) {
                                ListaProyectos2[i] = ListaProyectos[i];
                            }
                        }

                        console.log(ListaProyectos2[ListaProyectos2.length -1].embeds[0]);

                        if(typeof ListaProyectos2[0] == "undefined") {
                            msg.channel.send("No tienes ningun proyecto a tu nombre, crea uno con  `+crear proyecto`.");

                            return true;
                        }
            
                        ListaProyectos2[ListaProyectos2.length - 1].delete();

                        msg.channel.send("El proyecto ha sido eliminado " + msg.author);
            
                        return true;
        } else {
            msg.delete(100);

            await msg.channel.send("El tipo tiene que ser 'proyecto' o 'perfil'");

            return true;
        }
    }
};