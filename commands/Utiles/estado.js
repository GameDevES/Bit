const Comando = require('../../estructuras/Comando');

module.exports = class extends Comando {

    constructor(...args) {
        super(...args, {
            name: 'estado',
            enabled: true,
            runIn: ['text'],
            cooldown: 4,
            description: 'Cambia el estado.',
            usage: '<estado:str> [...]',
            extendedHelp: '+estado',
            comando: '+estado'
        });
    }
    async run(msg, [...estado]) {
          const bot = msg.client.users.get("375079939029991425");

          estado = `${estado.join(' ')}`;

          await bot.setActivity(estado);
			
            await msg.channel.send("Se ha cambiado el estado.");
			await msg.delete(100);

          return true;

  }
};