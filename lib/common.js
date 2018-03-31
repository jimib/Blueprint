module.exports = {
	castToBoolean : castToBoolean
}


function castToBoolean( value ){
	if( typeof value == 'string' ){
		value = value.toLowerCase();
	}

	switch( value ){
		case true:
		case 'true':
		case 't':
		case 'y':
			return true;
		
		case false:
		case 'false':
		case 'f':
		case 'n':
			return false;
	}
}