var assert = require('assert');

var Validator = require('../src/validator');

var validator = new Validator();

//validator.fileExists(filename)
describe('validate user inputs', function(){
	it('should return valid files', function(){
		assert.equal(validator.fileExists(__dirname + '/inputs.js'), true);
		assert.equal(validator.fileExists(__dirname + '/invalidFile.js'), false);
	});

	it('should return valid emails', function(){
		assert.equal(validator.email('invalid'), false);
		assert.equal(validator.email('valid@domain.do'), true);
		assert.equal(validator.email('invalid@domain'), false);
		assert.equal(validator.email(''), false);
		assert.equal(validator.email(null), false);

	});
});