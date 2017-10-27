const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'encuesta',
            runIn: ['text'],
            usage: '<titulo:str> <desc:str> <bool:boolean> <op1:str> <op2:str> [op3:str] [op4:str] ',
            usageDelim: '|'
        });
    }

    async run(msg, [titulo, desc, bool, op1, op2, op3, op4]) {
    if (Boolean == false) {
      console.log("Hola")
      msg.channel.send({embed:  {
      color: 0xee4646,
      title: `${titulo}`,
      description: `${desc}`,
      fields: [{
          name: `Opción 1`,
          value: `:a: ${op1}`
        },
        {
          name: `Opción 2`,
          value: `:b: ${op2}`
        },
        {
          name: `Opción 3`,
          value: `:c: ${op3}`
        },
        {
          name: `Opción 4`,
          value: `:d: ${op4}`
        }
      ],
      timestamp: new Date(),
      footer: {
        text: "gamedev.es"
        }
      }
    }).then(m => {
                m.react("1\u20e3");
                m.react("2\u20e3");
                m.react("3\u20e3");
                m.react("4\u20e3");
              });
            } else{
              console.log("Roberto");
              msg.channel.send({embed:  {
              color: 0xee4646,
              title: `${titulo}`,
              description: `${desc}`,
              fields: [{
                  name: `Opción 1`,
                  value: `:regional_indicator_a: ${op1}`
                },
                {
                  name: `Opción 2`,
                  value: ` :regional_indicator_b: ${op2}`
                },
                {
                  name: `Opción 3`,
                  value: ` :regional_indicator_c: ${op3}`
                },
                {
                  name: `Opción 4`,
                  value: ` :regional_indicator_d: ${op4}`
                }
              ],
              timestamp: new Date(),
              footer: {
                text: "gamedev.es"
                }
              }
            }).then(m => {
                        m.react("\ud83c\udde6");
                        m.react("\ud83c\udde7");
                        m.react("\ud83c\udde8");
                        m.react("\ud83c\udde9");
                      });
            }
  }
};
