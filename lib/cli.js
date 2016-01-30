#!/usr/bin/env node

"use strict";

var path = require('path');
var fs = require('fs');
var cli = require('cli');

cli.parse({
  version: ['v', 'Print version'],
  check: ['c', 'Check local packages'],
  global: ['g', 'Check global packages']
});

var process_check = require('./process_commands');

function get_current_version() {
  var path_to_package_file = path.resolve(__dirname, '../package.json');
  var package_info = JSON.parse(fs.readFileSync(path_to_package_file));
  return package_info.version;
}

module.exports = cli.main(function (args, options) {
  console.log(options);
  if (options.version ===true) {
    console.log(get_current_version());
  } else {
    console.log('Processing....');
    process_check();
  }
});
