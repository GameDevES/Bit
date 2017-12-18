const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(client, dir, file, options = {}) {
        super(client, dir, file, options);
        this.comando = options.comando || 'No definido';

        if (options.permLevel >= 4 ) {
        	this.admins = true;
        } else {
        	this.admins = false;
        }
        
        this.opcional = options.opcional || undefined;
    }
}