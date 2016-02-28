var assert = require('assert');

var Validator = require('../src/validator');

var validator = new Validator();

//validator.fileExists(filename)
describe('validate user inputs', function(){
	it('should return valid files', function(){
		assert.equal(validator.fileExists(__dirname + '/inputs.js'), true);
		assert.equal(validator.fileExists(__dirname + '/invalidFile.js'), false);
	});
});