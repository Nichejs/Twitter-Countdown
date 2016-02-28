var assert = require('assert');
var Validator = require('../src/validator');


var validator = new Validator();

describe('validate user inputs', function(){
	it('should return valid files', function(){
		assert.equal(validator.fileExists(__dirname + '/inputs.js'), true);
		assert.equal(validator.fileExists(__dirname + '/invalidFile.js'), false);
		assert.equal(validator.fileExists(null), false);
	});

	it('should return valid emails', function(){
		assert.equal(validator.email('invalid'), false);
		assert.equal(validator.email('valid@domain.do'), true);
		assert.equal(validator.email('invalid@domain'), false);
		assert.equal(validator.email(''), false);
		assert.equal(validator.email(null), false);
	});

	it('should return valid emails', function(){
		assert.equal(validator.email('invalid'), false);
		assert.equal(validator.email('valid@domain.do'), true);
		assert.equal(validator.email('invalid@domain'), false);
		assert.equal(validator.email(''), false);
		assert.equal(validator.email(null), false);
	});

	it('should return valid dates', function(){
		assert.equal(validator.date('2015'), true);
		assert.equal(validator.date('2015-05'), true);
		assert.equal(validator.date('2015-05-05'), true);
		//assert.equal(validator.date('2015-05-05 17'), true);
		assert.equal(validator.date('2015-05-05 17:54'), true);
		assert.equal(validator.date('2015-05-05 12:12:32'), true);

		assert.equal(validator.date('2015-05-05-02'), false);
		assert.equal(validator.date(null), false);
		assert.equal(validator.date('INVALID'), false);

	});


});