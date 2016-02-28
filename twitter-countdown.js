#!/usr/bin/env node
var cowsay = require('cowsay'),
	inquirer = require('inquirer'),
	fs = require('fs'),
	cronparser = require('cron-parser'),
  humanToCron = require('human-to-cron'),
	_ = require('lodash'),
  // internal deps
  Countdown = require('./src/countdown.js');



// Welcome message with cowsay
var message = cowsay.say({
	text : 'Welcome! This is the final countdown!',
	e: 'oO',
	T: 'U '
});
console.log(message);
// End of welcome message

var questions = [
	{
		type: 'input',
		name: 'credentialsFile',
		message: 'What is your credentials file ?',
		default: 'credentials.js',
		validate: function(filename){
			return fs.existsSync(filename) ? true : 'File ' + filename + ' does not exist.';
		}
	},
	{
		type: 'input',
		name: 'crontab',
		message: 'How often do you want to run this? (every week, at midnight, friday 15:45..., or a crontab expression)',
		default: 'every day',
		validate: function(cronExpression){
      if(_.isEmpty(cronparser.parseString(cronExpression).errors)){
        return true;
      }
      var cronExpression = humanToCron(cronExpression);
			return _.isEmpty(cronparser.parseString(cronExpression).errors) ? true : 'Provide a valid crontab expression';
		},
    filter : function(cronExpression){
      if(_.isEmpty(cronparser.parseString(cronExpression).errors)){
        return cronExpression;
      }
      return humanToCron(cronExpression);
    }
	},
	{
		type: 'input',
		name: 'email',
		message: 'Your email (we will email you in case of errors)',
		validate: function(email){
			return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
			? true
			: 'Provide a valid email';
		}
	},
];


inquirer.prompt(questions, function(userData){
  var counter = new Countdown(userData);
});


