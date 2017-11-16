const { Command } = require('klasa');
const mysql = require('mysql');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'BuscarJuego',
            cooldown: 3,
            description: 'Crea un separador.',
            extendedHelp: '+separador'
        });
        this.comando = '+separador';
        this.admins = false;
    }
    async run(msg) {

            
            var connection = mysql.createConnection({
                user: 'root',
                password: 'Miclase1',
                host: 'localhost',
                database: 'Bit'
            });

            connection.connect();

            connection.query(`select * from Juegos where nombre = ${value}`, function(error, results, fields) {
                if (error) throw error;

                msg.channel.send(results[0].solution);
            });

            
			await msg.delete(100);

          return true;

  }
};