'use strict';

var Table = require('cli-table');
var chalk = require('chalk');
var cli = require('cli');
var table = exports;

var borderless_config = { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': '',
 	'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': '',
 	'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': '',
 	'right': '' , 'right-mid': '' , 'middle': ' ' };

table.local_dependancy_table = new Table({
	chars: borderless_config,
    head: [
		chalk.magenta.bold('Package name'), 
		chalk.magenta.bold('Installed'), 
		chalk.magenta.bold('Wanted'), 
		chalk.magenta.bold('Latest')
	],
    colWidths: [30, 13, 13, 13]
});

table.global_dependancy_table = new Table({
	chars: borderless_config,
    head: [
		chalk.magenta.bold('Package name'), 
		chalk.magenta.bold('Installed'), 
		chalk.magenta.bold('Latest')
	],
    colWidths: [30, 13, 13]
});

table.prefix_dependancy_table = new Table({
	chars: borderless_config,
    head: [
		chalk.magenta.bold('Package name'), 
		chalk.magenta.bold('Installed'), 
		chalk.magenta.bold('Latest')
	],
    colWidths: [30, 13, 13]
});

table.display_table = function (title, table) {
	var high_fence = chalk.gray.bold('----------------------------');
	title = high_fence+ chalk.white.underline.bold(title) + high_fence;
	cli.spinner(title, true);
	console.log(table.toString());
};