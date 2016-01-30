'use strict';

var check = require('./check');
var cli = require('cli');

function check_command(options)
{
	cli.spinner('Checking...');
	if (options.local === true) {
		check.process_default();
    } 
    if (options.prefix ===true) {
		check.process_prefix();
    } 
    if (options.global ===true) {
		check.process_global();
    }
}

module.exports = check_command;