"use strict";

var check_version = require('./check_packages_version');
var chalk = require('chalk');
var Table = require('cli-table');

var head = [
	chalk.magenta.bold('Package name'), 
	chalk.magenta.bold('Installed'), 
	chalk.magenta.bold('Available'), 
	chalk.magenta.bold('Latest')
	];
var borderless_config = { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': '',
 	'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': '',
 	'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': '',
 	'right': '' , 'right-mid': '' , 'middle': ' ' };
var dependancy_table = new Table({
	chars: borderless_config,
    head: head,
    colWidths: [25, 13, 13, 13]
});

function format_report(package_info)
{
	var name = chalk.blue.bold(package_info.name);
	var installed = package_info.installed;
	var available = package_info.available;
	var latest = package_info.latest;

	if (latest.localeCompare(available) === 0) {
		if (available.localeCompare(installed) === 0) {
			installed = chalk.green.bold(installed);
		}else {
			installed = chalk.red.bold(installed);
		}
		available = chalk.green.bold(available);
	} 
	else {
		available = chalk.red.bold(available);
		installed = chalk.red.bold(installed);
	}

	latest = chalk.green.bold(latest);
	return [name, installed, available, latest];
}

function process_default()
{
	check_version().then(function(report){
	    var packages = report.fulfilled;
	    for (var i = 0; i < packages.length; i++) {
	    	dependancy_table.push(format_report(packages[i]));
	    }
	    console.log(dependancy_table.toString());
	});
}

module.exports = process_default;