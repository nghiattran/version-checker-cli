"use strict";

var vercheck = require('version-checker');
var chalk = require('chalk');
var table = require('./table');
var cli = require('cli');
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

	if (installed === -1) {
		installed = 'Error';
	}

	if (installed.localeCompare(latest) === 0) {
		installed = chalk.green.bold(installed);
	}else {
		installed = chalk.red.bold(installed);
	}
	latest = chalk.green.bold(latest);
	return [name, installed, latest];
}

check.check_local = function()
{
	vercheck.check_local_packages().then(function(report){
		cli.spinner('Done!', true);
		for (var key in report)
		{
			var packages = report[key].fulfilled;
			for (var i = 0; i < packages.length; i++) {
		    	table.local_dependancy_table.push(local_format_report(packages[i], key));
		    }
		}
	    table.display_table(
	    	'Local packages',
	    	table.local_dependancy_table);
	}, function (error){
		cli.spinner(chalk.red.bold(error), true);
	});
};

check.check_global = function()
{
	vercheck.check_global_packages().then(function(report){
		cli.spinner('Done!', true);
	    var packages = report.pro.fulfilled;
	    for (var i = 0; i < packages.length; i++) {
	    	table.global_dependancy_table.push(global_format_report(packages[i]));
	    }
	    table.display_table(
	    	'Global packages',
	    	table.global_dependancy_table);
	}, function (error){
		cli.spinner(chalk.red.bold(error), true);
	});
};

check.check_prefix = function()
{
	vercheck.check_prefix_packages().then(function(report){
		cli.spinner('Done!', true);
	    var packages = report.pro.fulfilled;
	    for (var i = 0; i < packages.length; i++) {
	    	table.prefix_dependancy_table.push(global_format_report(packages[i]));
	    }
	    table.display_table(
	    	'Prefix packages',
	    	table.prefix_dependancy_table);
	}, function (error){
		cli.spinner(chalk.red.bold(error), true);
	});
};