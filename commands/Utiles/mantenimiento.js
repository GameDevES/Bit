const Comando = require('../../estructuras/Comando');
const fs = require("fs");

const bot = require("./../../bot");

module.exports = class extends Comando {

    constructor(...args) {
        super(...args, {
            name: 'mant',
            enabled: true,
            runIn: ['text'],
			permLevel: 10,
            cooldown: 0,
			usage: '<sino:str>',
	        permLevel: 4,
            description: 'Pone en mantenimiento el bot.',
            extendedHelp: '+mant',
            comando: '+mant',
            admins: true
        });
    }
    async run(msg, [...sino]) {
			if(sino == "true"){
				bot.mant(true);
				msg.send("El bot ha sido puesto en modo mantenimiento");
			}else if(sino == "false") {
				bot.mant(false);
				msg.send("El bot ha sido quitado del modo mantenimiento");
			}
          return msg.delete(100);

  }
};
