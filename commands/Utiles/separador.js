const { Command } = require('klasa');
const fs = require("fs");

const bot = require("./../../src/imp");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'separador',
            enabled: true,
            runIn: ['text'],
            cooldown: 3,
            description: 'Crea un separador.'
        });
    }
    async run(msg) {
          msg.channel.sendFile('https://cdn.discordapp.com/attachments/360666079804260352/366634302542446594/barra_gamedev.png');
			
			await msg.delete(100);

          return true;

  }
};
