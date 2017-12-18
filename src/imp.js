var exports = module.exports = {};

const config = require("../config.json");
const botDataJson = require("./../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const chalk = require('chalk');
const client = new Discord.Client();
const now = require("performance-now");

exports.sendAdminMessage = function (/**String*/ message) {
    let guilds = client.guilds;

    guilds.map(function (a) {
        a.owner.send(message);
        console.log(">> Bot Action > Server Admin DM sent to: " + a.owner.user.username + " - Server Admin of the server: " + a.name);
        console.log("> Direct invite link to server: currently not available. on development.")
    });
};

exports.maintenance = function (/**boolean*/ maintenanceBool, /**Number*/t0) {
    if(maintenanceBool === true){
        // localPresence values before the maintenance starts

        // Set new values to the bot user
        this.sendAdminMessage("Hello dear server admin, currently I´m currently in maintenance so don´t wonder why you may not can access all functions. We will inform you when we finished our maintenance!");

        addLog({
            "log_type" : "info",
            "log_message" : "Server admins got an message which contains information that maintenance was enabled!",
            "log_date" : Date.now(),
            "log_action" : "",
			"log_user": ""
        });

        setTimeout(function(){
            addLog({
                "log_type" : "info",
                "log_message" : "Values of bot client changed!",
                "log_date" : Date.now(),
                "log_action" : "Changed values: client.user.localPresence.status , client.user.localPresence.game.name",
				"log_user": ""
            });
        }, 60);

        // Reading the file and replace property values to new ones

        fs.readFile("./config.json", "utf-8", function (err, data) {
            if (err) throw err;
            let botData = JSON.parse(data);

            // Setting new values for properties.

            botData.maintenance = true;

            // Writing new property values into botData.json

            fs.writeFile('./config.json', JSON.stringify(botData, null, 3), 'utf-8', function(err) {
                if (err) throw err;

                // Output the changes

                console.log(chalk.greenBright(">> Successfully edited config.json. Followed values were changed in config.json:"));
                console.log(chalk.yellowBright(">> maintenance: ") + chalk.redBright("false") + " -> " + chalk.greenBright.bold("true"));
                setTimeout(function() {
                    addLog({
                        "log_type": "info",
                        "log_message": "Values in config.json changed!",
                        "log_date": Date.now(),
                        "log_action": "Changed property values: maintenance",
						"log_user": ""
                    });
                }, 80)

            })
        });

        // Output the notification

        // I added a timeout cause when I call this function too many times, it cause an error or it doesn´t add all lob entries.
        // Maybe there is an solution but currently I didn´t found one.
        let t1 = now();
        setTimeout(function() {
            addLog({
                "log_type": "maintenance",
                "log_message": "Maintenance was enabled!",
                "log_date": Date.now(),
                "log_action": "Enabling maintenance took " + (t1 - t0).toFixed(3) + "ms",
				"log_user": ""
            });
        }, 100);

        console.log("\n>> Bot > Maintenance are now " + chalk.redBright.bold("enabled!"));
        console.log(">> Bot > Notification Message was sent to server admins.");


	return true;
    }else{
        // localPresence values before the maintenance ends

        // Set new values to the bot user

        setTimeout(function(){
            addLog({
                "log_type" : "info",
                "log_message" : "Values of bot client changed!",
                "log_date" : Date.now(),
                "log_action" : "Changed values: client.user.localPresence.status , client.user.localPresence.game.name",
				"log_user": ""
            });
        }, 60);

        // Reading the file and replace property values to new ones
        fs.readFile("./config.json", "utf-8", function (err, data) {
            if (err) throw err;
            let botData = JSON.parse(data);

            // Setting new values for properties.

            botData.maintenance = false;

            // Writing new property values into botData.json

            fs.writeFile('./config.json', JSON.stringify(botData, null, 3), 'utf-8', function(err) {
                if (err) throw err;

                // Output the changes in the files

                console.log(chalk.greenBright(">> Successfully edited config.json. Followed values were changed in config.json:"));
                console.log(chalk.yellowBright(">> maintenance: ") + chalk.redBright("true") + " -> " + chalk.greenBright.bold("false"));
                setTimeout(function() {
                    addLog({
                        "log_type": "info",
                        "log_message": "Values in config.json changed!",
                        "log_date": Date.now(),
                        "log_action": "Changed property values: maintenance",
						"log_user": ""
                    });
                }, 80);
            })
        });

        // Output the notification

        console.log("\n>> Bot > Maintenance are now " + chalk.greenBright.bold("disabled!"));

        let t1 = now();
        setTimeout(function() {
            addLog({
                "log_type": "maintenance",
                "log_message": "Maintenance was disabled!",
                "log_date": Date.now(),
                "log_action": "Disabling maintenance took " + (t1 - t0).toFixed(3) + "ms",
				"log_user": ""
            });
        }, 100)
		return false;
    }
};

exports.addLog = (/**Object*/logData) => {

    fs.readFile("./log.json", "utf-8" , (err, data) => {

        if (err) { throw err; }
        let log = JSON.parse(data);

        log.push(logData);
        fs.writeFile("./log.json", JSON.stringify(log, null, 3), (err) => {
            if(err) throw err;
        })
    })
};

addLog = (/**Object*/logData) => {

    fs.readFile("./log.json", "utf-8" , (err, data) => {

        if (err) { throw err; }
        let log = JSON.parse(data);

        log.push(logData);
        fs.writeFile("./log.json", JSON.stringify(log, null, 3), (err) => {
            if(err) throw err;
        })
    })
};