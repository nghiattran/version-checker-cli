'use strict';

var check = require('./check');
var cli = require('cli');

function check_command(options)
{
	cli.spinner('Checking...');
	if (options.all === null && options.local === null &&
		options.all === null && options.local === null) 
	{
		check.check_global();
	}

	if (options.all === true || options.local === true) {
		check.check_local();
    } 
    if (options.all === true || options.prefix ===true) {
		check.check_prefix();
    } 
    if (options.all === true || options.global ===true) {
		check.check_global();
    }
}

module.exports = check_command;