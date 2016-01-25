"use strict";

var packageJson = require('package-json');
var fs = require("fs");
var path = require("path");
var q = require('q');
var find_up = require('find-up');

String.prototype.set_path_to = function(file) {
  return this + "/" + file;
};

Object.prototype.concat = function(object) {
    var result={};
    for(var key in this) {
        result[key]=this[key];
    }
    for(key in object) {
        result[key]=object[key];
    }
    return result;
};

function get_base_path()
{
    return path.dirname(find_up.sync('package.json', {}));
}

function read_packageJson_file(path_to_package_file)
{
    return JSON.parse(fs.readFileSync(path_to_package_file));
}

function get_path_to_pakageJson()
{
    return get_base_path().set_path_to('package.json');
}

function get_installed_package_version(package_name)
{
    var base_path = get_base_path();
    var package_path = path.resolve(base_path, "node_modules/" +
        package_name + "/package.json");
    var package_info = read_packageJson_file(package_path);
    return package_info.version;
}

function get_package_info(package_name, version) {
    return packageJson(package_name, version).then(function(available) {
        return packageJson(package_name, 'latest').then(function(latest) {
            return {
                name: package_name,
                required: version,
                available: available.version,
                latest: latest.version,
                installed: get_installed_package_version(package_name)
            };
        });
    });
}

function get_required_packages(package_info) {
    return package_info.dependencies.concat(package_info.devDependencies);
}

function generate_report(packages)
{
    var promises = [];
    for (var key in packages)
    {
        if (typeof packages[key] === 'string') {
            promises.push(get_package_info(key, packages[key]));
        }
    }
    return  q.allSettled(promises)
        .then(function (data_in_promises) {
            var fulfilled = [];
            var error = [];
            for (var i = 0; i < data_in_promises.length; i++) {
                if (data_in_promises[i].state === 'fulfilled') {
                    fulfilled.push(data_in_promises[i].value);
                } else {
                    error.push(data_in_promises[i].value);
                }
            }
            return {fulfilled: fulfilled, error: error};
        });

}

function check_version()
{
    // Get all packages in package.json
    var path_to_package_file = get_path_to_pakageJson();
    var package_info = read_packageJson_file(path_to_package_file);
    var packages = get_required_packages(package_info);

    return generate_report(packages).then(function(report){
        return report;
    });
}

module.exports = check_version;