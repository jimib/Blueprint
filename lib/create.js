const common = require('./common');
const path = require('path');
const fs = require('fs-extra-promise');
const _ = require('lodash');

const config = require( path.resolve('.blueprint') );

module.exports = function(){
	var [type] = _.slice( process.argv, 2 );

	const Enquirer = require('enquirer');
	const enquirer = new Enquirer();
 
	enquirer.register('list', require('prompt-list'));

	console.log(`create ${type}`);
	//list all the template types from the templates directory
	fs.readdirAsync( path.resolve( config.templates ) )
	.then( dirs => {
		return enquirer.ask({
			type: 'list',
			name: 'template',
			message: 'Which template:',
			choices: dirs
		})
	} )
	.then( result => {
		//read the list of that template types and allow the user to choose the one they want
		var {template} = result;
		return fs.readdirAsync( path.resolve( config.templates, template ) )
		.then( files => {
			if( files.length == 0 ){
				throw new Error(`No template of type '${template}' exists`);
			}else if( files.length == 1 ){
				return path.resolve( config.templates, template, files[0] );
			}else{
				//ask which the user wants to use
				return enquirer.ask({
					type: 'list',
					name: 'file',
					message: 'Which type:',
					choices: files
				})
				.then( result => {
					return path.resolve( config.templates, template, result.file );
				} )
			}
		})
		.then( file => {
			return {
				template : template,
				file : file
			}
		} )
	} )
	.then( result => {
		//ask for the name of the file
		return enquirer.ask({
			name: 'name',
			message : `What do you want to call this '${result.template.replace(/s$/,'')}'`
		})
		.then( iresult => {
			result.name = iresult.name;
			return result;
		} )
	} )
	.then( result => {
		//read the file and build a list of variables the user can populate
		return fs.readFileAsync( result.file )
		.then( data => {
			data = data.toString();

			var REGEXP_VARIABLES = /\$\{([a-zA-Z0-9_]+)\}/g;
			var result = null;
			var questions = [];
			while( result = REGEXP_VARIABLES.exec( data ) ){
				var variableName = result[1];
				if( !_.find( questions, {name:variableName} ) ){
					questions.push({
						name : variableName,
						message : `Variable: ${variableName}`,
						default : result.name
					});
				}
			}

			//map the questions to an array - used an object
			if( questions.length > 0 ){
				//ask the questions and replace the variables
				const enquirerVariableNames = new Enquirer();
				return enquirerVariableNames.ask( questions )
				.then( result => {
					if( result ){
						_.each( result, ( value, id ) => {
							//replace this items in the data
							data = data.split('${'+id+'}').join( value );
						} );
					}
					//return the manipulated contents
					return data;
				} )
			}else{
				//do nothing
				return data;
			}
		} )
		.then( data => {
			//write this file out to the appropriate location
			var dir = path.resolve(config.target, result.template);
			var filePath = path.resolve( dir, `${result.name}${path.extname(result.file)}` );
			//1) make the directory
			//2) write the file
			return fs.mkdirsAsync( dir, config )
			.then( result => {
				//write the file now that we've created the directory
				return fs.writeFileAsync( filePath, data );
			} )
			.then( result => {
				console.log( filePath );
			} );
		} );
	} )
	
}
