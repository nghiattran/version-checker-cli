var Table = require('cli-table');
var chalk = require('chalk');
var table_format = exports;

var borderless_config = { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': '',
 	'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': '',
 	'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': '',
 	'right': '' , 'right-mid': '' , 'middle': ' ' };

table_format.local_dependancy_table = new Table({
	chars: borderless_config,
    head: [
		chalk.magenta.bold('Package name'), 
		chalk.magenta.bold('Installed'), 
		chalk.magenta.bold('Available'), 
		chalk.magenta.bold('Latest')
	],
    colWidths: [30, 13, 13, 13]
});

table_format.global_dependancy_table = new Table({
	chars: borderless_config,
    head: [
		chalk.magenta.bold('Package name'), 
		chalk.magenta.bold('Installed'), 
		chalk.magenta.bold('Latest')
	],
    colWidths: [30, 13, 13]
});