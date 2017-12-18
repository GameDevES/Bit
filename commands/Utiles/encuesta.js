const Comando = require('../../estructuras/Comando');
const Discord = require('discord.js');

var a = ['','one','two','three','four','five','six','seven','eight','nine'];
var b = ['','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var c = ['','\uD83C\uDDE6','\uD83C\uDDE7','\uD83C\uDDE8','\uD83C\uDDE9','\uD83C\uDDEA','\uD83C\uDDEB','\uD83C\uDDEC','\uD83C\uDDED','\uD83C\uDDEE','\uD83C\uDDEF','\uD83C\uDDF0','\uD83C\uDDF1','\uD83C\uDDF2','\uD83C\uDDF3','\uD83C\uDDF4','\uD83C\uDDF5','\uD83C\uDDF6','\uD83C\uDDF7','\uD83C\uDDF8','\uD83C\uDDF9','\uD83C\uDDFA','\uD83C\uDDFB','\uD83C\uDDFC','\uD83C\uDDFD','\uD83C\uDDFE','\uD83C\uDDFF'];

module.exports = class extends Comando {

    constructor(...args) {
        super(...args, {
            name: 'encuesta',
            runIn: ['text'],
            description: 'Sirve para generar una encuesta automática en el canal de comunicados. Máximo 20 opciones.',
            usage: '<bool:str> <numop:int> <parametros:str> [...]',
            permLevel: 4,
            extendedHelp: '+encuesta numeros | Elige un color | ¿Qué color te gusta más? | Azul | Rojo | Verde | Amarillo',
            usageDelim: ' ',
            comando: '+encuesta  <numeros/letras> | <cantidad de opciones> | <Título> | <Descripción> | <Opción1> | <Opción2>',
            admins: true
        });
    }

    async run(msg, [bool, numop, ...parametros]) {

    const canal = msg.guild.channels.get(msg.guild.configs.comunicados);

    parametros = `${parametros.join(' ')}`;
    var partes = parametros.split('|');

    const titulo = partes[1];
    const desc = partes[2];
    
    if (numop <=20) {
    if (numop <= 9 && bool == 'numeros') {
      const embedEncuesta = new Discord.MessageEmbed()
      .setColor(0xee4646)
      .setTitle(`${titulo}`)
      .setDescription(`${desc}`)
      .setTimestamp(new Date())
      .setFooter(`gamedev.es`)

      for(var i = 1; i < (numop+1); i++) {
          embedEncuesta.addField('\u200b', `:` + inWords(true, i) + `: ` + partes[i+2]);
      }
      embedEncuesta2.addField('\u200b', `@everyone`);

      canal.send(embedEncuesta).then(async function (message){
        for (var i = 1; i < (numop+1); i++) {
            await message.react("" + i + "\u20e3");
        }
      });
      await msg.delete(100);

            } else {
              const embedEncuesta2 = new Discord.MessageEmbed()
              .setColor(0xee4646)
              .setTitle(`${titulo}`)
              .setDescription(`${desc}`)
              .setTimestamp(new Date())
              .setFooter(`gamedev.es`)

              for(var i = 1; i < (numop+1); i++) {
                  embedEncuesta2.addField('\u200b', `:regional_indicator_` + inWords(false, i) + `: ` + partes[i+2]);
              }
              embedEncuesta2.addField('\u200b', `@everyone`);

              canal.send(embedEncuesta2).then(async function (message){
                        for (var i = 1; i < (numop+1); i++) {
                            await message.react("" + c[i]);
                        }
                      });
              await msg.delete(100);
            }
          } else {
            msg.channel.send('```csharp\n# ERROR: Se ha excedido el número máximo de reacciones permitidas (20)\n```');
            msg.delete(100);
          }
      return true;
  }
};

function inWords (ifNum, num) {
    if (ifNum) {
      return a[num];
    } else {
      return b[num];
    }
}