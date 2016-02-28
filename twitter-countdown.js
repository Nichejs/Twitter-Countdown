#!/usr/bin/env node
var cowsay = require('cowsay'),
	inquirer = require('inquirer'),

  	// internal deps
  	Countdown = require('./src/countdown'),
  	Validator = require('./src/validator');
  	Filter = require('./src/filter');

// Welcome message with cowsay
var message = cowsay.say({
	text : 'Welcome! This is the final countdown!',
	e: 'oO',
	T: 'U '
});
console.log(message);
// End of welcome message

var validator = new Validator();
var filter = new Filter();

var questions = [
	{
		type: 'input',
		name: 'credentialsFile',
		message: 'What is your credentials file ?',
		default: 'credentials.js',
		validate: function(filename){
			return validator.fileExists(filename) ? true : 'File ' + filename + ' does not exist.';
		}
	},
	{
    	type: 'input',
    	name: 'date',
    	message: 'What is the ending date? (YYYY-MM-DD HH:MM:SS, you can leave empty anything from right to left)',
    	validate: function(dateInput){
      		return validator.date(dateInput) ? true : 'Provide a valid date';
    	},
    	filter: function(dateInput){
      		return filter.date(dateInput);
    	}
  	},
	{
		type: 'input',
		name: 'crontab',
		message: 'How often do you want to run this? (every week, at midnight, friday 15:45..., or a crontab expression)',
		default: 'every day',
		validate: function(cronExpression){
      		return validator.cronExpression(cronExpression) ? true : 'Provide a valid crontab expression';
		},
    	filter : function(cronExpression){
    		return filter.crontab(cronExpression);	      	
    	}
	},
	{
		type: 'input',
		name: 'email',
		message: 'Your email (we will email you in case of errors)',
		validate: function(email){
			return validator.email(email)
			? true
			: 'Provide a valid email';
		}
	},
];


inquirer.prompt(questions, function(userData){
  var counter = new Countdown(userData);
});


