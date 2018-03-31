#!/usr/bin/env node
var _ = require('lodash');
var lib = require('../lib/index.js');
const COMMANDS = _.map( lib, ( value, id ) => id );
const package = require('../package.json');

if( process.argv[0] == package.name ){
	//if first argument is blueprint then we're running this as a command
	//DO NOTHING
}else{
	//otherwise we are in a test mode - drop the first argument
	process.argv = _.slice( process.argv, 1 );
	process.argv[0] = package.name;
}




//get the second argument to determine what is required
var command = process.argv[1];



console.log('blueprint', command);

if( _.includes( COMMANDS, command ) ){
	lib[command]();
}else{
	console.log(`Available commands:\n\n${COMMANDS.join('\n')}\n`);
}