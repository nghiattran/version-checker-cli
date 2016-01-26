"use strict";

var vercheck = require('version-checker');
var chalk = require('chalk');
var table_format = require('./format_table');

var check = exports;

function local_format_report(package_info, key)
{
	var name = chalk.blue.bold(package_info.name);
	var installed = package_info.installed;
	var available = package_info.available;
	var latest = package_info.latest;

	if (latest.localeCompare(available) === 0) {
		if (available.localeCompare(installed) === 0) {
			installed = chalk.green.bold(installed);
		}else {
			installed = chalk.red.bold(installed);
		}
		available = chalk.green.bold(available);
	} 
	else {
		available = chalk.red.bold(available);
		installed = chalk.red.bold(installed);
	}
	latest = chalk.green.bold(latest);

	if (key === 'dev') {
		name = name + chalk.yellow.bold("(dev)");
	}
	return [name, installed, available, latest];
}

function global_format_report(package_info)
{
	var name = chalk.blue.bold(package_info.name);
	var installed = package_info.installed;
	var latest = package_info.latest;

	if (installed.localeCompare(latest) === 0) {
		installed = chalk.green.bold(installed);
	}else {
		installed = chalk.red.bold(installed);
	}
	latest = chalk.green.bold(latest);
	return [name, installed, latest];
}

check.process_default = function()
{
	vercheck.check_local_packages().then(function(report){
		for (var key in report)
		{
			var packages = report[key].fulfilled;
			for (var i = 0; i < packages.length; i++) {
		    	table_format.local_dependancy_table.push(local_format_report(packages[i], key));
		    }
		}
	    console.log(table_format.local_dependancy_table.toString());
	});
}

check.process_global = function()
{
	vercheck.check_global_packages().then(function(report){
	    var packages = report.pro.fulfilled;
	    for (var i = 0; i < packages.length; i++) {
	    	table_format.global_dependancy_table.push(global_format_report(packages[i]));
	    }
	    console.log(table_format.global_dependancy_table.toString());
	});
}

check.process_prefix = function()
{
	vercheck.check_prefix_packages().then(function(report){
	    var packages = report.pro.fulfilled;
	    for (var i = 0; i < packages.length; i++) {
	    	table_format.global_dependancy_table.push(global_format_report(packages[i]));
	    }
	    console.log(table_format.global_dependancy_table.toString());
	});
}