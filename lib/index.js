#!/usr/bin/env node

"use strict";

var path = require('path');
var fs = require('fs');
var cli = require('cli');
var dir = require('global-modules');

cli.parse({
  version: ['v', 'Print version'],
  check: ['c', 'Check local packages'],
  global: ['g', 'Check global packages'],
  prefix: ['p', 'Check global packages']
});

var check = require('./process_commands');

cli.main(function (args, options) {
  console.log(options);
  if (options.version ===true) {
  	console.log(get_current_version());
  } else {
    console.log('Processing...')
    if (options.global === true) {
      check.process_global();
    } else if (options.prefix ===true) {
      check.process_prefix();
    } else {
      check.process_default();
    }
  }
});

function get_current_version() {
  var path_to_package_file = path.resolve(__dirname, '../package.json');
  var package_info = JSON.parse(fs.readFileSync(path_to_package_file));
  return package_info.version;
}