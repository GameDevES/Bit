const { Command } = require('klasa');
const Discord = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'encuesta',
            runIn: ['text'],
            usage: '<bool:str> <parametros:str> [...]',
            permLevel: 4,
            extendedHelp: 'Tienes que poner | para separar el título de la descripción y de los demas operandos, +encuesta <bool> | <titulo> | <descripción> | <opcion1> | <opcion2> | <opcion3> | <opcion4>.',
            usageDelim: ' '
        });
    }

    async run(msg, [bool, ...parametros]) {

    const canal = msg.guild.channels.get(msg.guild.settings.comunicados);

    parametros = `${parametros.join(' ')}`;
    var partes = parametros.split('|');

    const titulo = partes[0];
    const desc = partes[1];
    const op1 = partes[2];
    const op2 = partes[3];
    const op3 = partes[4];
    const op4 = partes[5];
    if (bool == 'false') {
      const embedEncuesta = new Discord.MessageEmbed()
      .setColor(0xee4646)
      .setTitle(`${titulo}`)
      .setDescription(`${desc}`)
      .addField(`Opción 1`, `:one: ${op1}`)
      .addField(`Opción 2`, `:two: ${op2}`)
      .addField(`Opción 3`, `:three: ${op3}`)
      .addField(`Opción 4`, `:four: ${op4}`)
      .setTimestamp(new Date())
      .setFooter(`gamedev.es`)
      .setURL("gamede.es");

      canal.send(embedEncuesta).then(async function (message){
        await message.react("1\u20e3");
        await message.react("2\u20e3");
        await message.react("3\u20e3");
        await message.react("4\u20e3");
      });
      msg.delete(100);

            } else if(bool = 'true'){
              const embedEncuesta2 = new Discord.MessageEmbed()
              .setColor(0xee4646)
              .setTitle(`${titulo}`)
              .setDescription(`${desc}`)
              .addField(`Opción 1`, `:regional_indicator_a: ${op1}`)
              .addField(`Opción 2`, `:regional_indicator_b: ${op2}`)
              .addField(`Opción 3`, `:regional_indicator_c: ${op3}`)
              .addField(`Opción 4`, `:regional_indicator_d: ${op4}`)
              .setTimestamp(new Date())
              .setFooter(`gamedev.es`)
              .setURL("gamede.es");

              canal.send(embedEncuesta2).then(async function (message){
                        await message.react("\ud83c\udde6");
                        await message.react("\ud83c\udde7");
                        await message.react("\ud83c\udde8");
                        await message.react("\ud83c\udde9");
                      });
              msg.delete(100);
            } else {
              msg.delete(100);
              msg.channel.send("El parametro bool tienes que ser: true o false");
            }
      return true;
  }
};