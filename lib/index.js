#!/usr/bin/env node
"use strict";

var cli = require('cli');
var default_command = require('./process_commands');

cli.setApp('checker', '0.6.5');
cli.enable('version');
var options = cli.parse({      
	check: [ 'c', 'Check local packages', 'bool', false ],
});

cli.main(function(args, options) {
    if (options.check ===true) {
    	console.log('Processing....');
    	default_command();
    }
});

