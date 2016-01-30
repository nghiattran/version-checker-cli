#!/usr/bin/env node

"use strict";

var path = require('path');
var fs = require('fs');
var cli = require('cli').enable('version');

cli.setApp('vc', get_current_version());
cli.parse({
  local: ['l', 'Check local packages.'],
  global: ['g', 'Check global packages.'],
  prefix: ['p', 'Check packages at you prefix path.']
}, ['check']);

var check_cli = require('./check_cli');
cli.main(function (args, options) {
  if(cli.command === 'check') {
    check_cli(options);
  }
});

function get_current_version() {
  var path_to_package_file = path.resolve(__dirname, '../package.json');
  var package_info = JSON.parse(fs.readFileSync(path_to_package_file));
  return package_info.version;
}