const klasa = require('klasa');
const config = require('./config.json');
const { Client, PermissionLevels } = require('klasa');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const chalk = require('chalk');
var log = require("./log.json");
const fs = require("fs");

const bot = require("./src/imp");

var exports = module.exports = {};

const app = express();

klasa.Client.defaultPermissionLevels

	.addLevel(3, false, (client, msg) => msg.member.roles.exists('name', 'Usuario') )
	.addLevel(4, false, (client, msg) => msg.member.roles.exists('name', 'Moderador') || msg.member.roles.exists('name', 'Administrador') );

const client = new klasa.Client({
    clientOptions: {
        fetchAllMembers: false
    },
    prefix: '+',
    cmdEditing: true,
    typing: true,
    ownerID: 207164528222404608,
    readyMessage: (client) => `${client.user.tag}, Ready to serve ${client.guilds.size} guilds and ${client.users.size} users`
});


client.login(config.token);

var maintenanceStatus = config.maintenance;

exports.mantBot = maintenanceStatus;

app.set('view engine', 'ejs');

app.use('/web', express.static('web', { redirect : false }));
app.use('/styles', express.static('src', { redirect : false }));
app.use(session({secret: 'ssshhhhh',
				resave: true,
				saveUninitialized: true}));

app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
	
app.get("/", (req, res) => {
		log = require("./log.json");
        res.render("index", {
            data: client,
			maintenanceStatus: maintenanceStatus,
            log: log
        })
    });
	
app.listen("3000", function () {
        console.log(chalk.cyanBright('>> Dashboard is online and running on port ' + config.LISTENING_PORT + '!\n'));
    });

exports.mant = function (/**boolean*/mantbool) {
	bot.maintenance(mantbool);
	if(mantbool == true) {
		maintenanceStatus = true;
		exports.mantBot = maintenanceStatus;
	} else {
		maintenanceStatus = false;
		exports.mantBot = maintenanceStatus;
	}
}

exports.dmNotification = function (/**String*/user,/**String*/content,/**Integer*/timestamp) {
    console.log(chalk.yellowBright('>> Bot: You´ve got a DM by ' +  user + " with following content:"));
    console.log(chalk.yellow(content));

    let date = new Date(timestamp);
    let day = this.convertingGetDay(date.getDay());

    // To understand converting timestamps to a normal known date
    // look at this question in StackOverflow -> https://goo.gl/Lb2Nxa
    // MDN Documentation about Date -> https://goo.gl/rT25GW

    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

    console.log(chalk.greenBright('Message sent at ' + day + ", " + date.getMonth() +  "/" + date.getDate() + "/" + date.getFullYear() + ", " + date.getHours() + ':' + minutes.substr(-2) + ":" + seconds.substr(-2) + ' \n'));
};

exports.convertingGetDay = function (getDay) {
    let day;
    switch (getDay){
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        default:
            day = "A problem occurred when trying to convert the Date.getDay() integer to a string \n";
    }
    return day;
};