'use strict';

function update_command(options)
{
	if (options.all === true || options.local === true) {
		spawn.sync('npm', ['update'], { stdio: 'inherit' });
    } 
    if (options.all === true || options.global ===true) {
    	spawn.sync('npm', ['update', '-g'], { stdio: 'inherit' });
    }
}

module.exports = update_command;