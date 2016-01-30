#!/usr/bin/env node

"use strict";
var check_cli = require('./check_cli');
var update_cli = require('./update_cli');
var path = require('path');
var fs = require('fs');
var cli = require('cli').enable('version');

cli.setApp('vc', get_current_version());
cli.parse({
  local: ['l', 'Perform locally.'],
  global: ['g', 'Perform globally.'],
  prefix: ['p', 'Perform at your npm prefix path.'],
  all: ['a', 'Perform locally, globally, and at your npm prefix path.']
}, ['check', 'update']);

cli.main(function (args, options) {
  if(cli.command === 'check') {
    check_cli(options);
  } else if(cli.command === 'update') {
    update_cli(options);
  }
});

function get_current_version() {
  var path_to_package_file = path.resolve(__dirname, '../package.json');
  var package_info = JSON.parse(fs.readFileSync(path_to_package_file));
  return package_info.version;
}