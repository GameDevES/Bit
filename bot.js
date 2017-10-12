const klasa = require('klasa');

const client = new klasa.Client({
    clientOptions: {
        fetchAllMembers: false
    },
    prefix: '+',
    cmdEditing: true,
    typing: true,
    readyMessage: (client) => `${client.user.tag}, Ready to serve ${client.guilds.size} guilds and ${client.users.size} users`
});

client.login('TOKEN');