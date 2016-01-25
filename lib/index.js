#!/usr/bin/env node
"use strict";

var path = require('path');
var fs = require('fs');
var cli = require('cli');
var default_command = require('./process_commands');

cli.parse({      
	version: [ 'v', 'Check local packages', 'bool', false ],
	check: [ 'c', 'Check local packages', 'bool', false ],
});

cli.main(function(args, options) {
    if (options.version ===true) {
    	console.log(get_current_version());
    } else {
    	console.log('Processing....');
    	default_command();
    }
});

function get_current_version()
{
    var path_to_package_file = path.resolve(__dirname, '../package.json');
    var package_info = JSON.parse(fs.readFileSync(path_to_package_file));
    return package_info.version;
}