var cowsay = require('cowsay'),
	inquirer = require('inquirer'),
	fs = require('fs'),
	cronparser = require('cron-parser'),
	_ = require('lodash');



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
		message: 'What is your crontab config?',
		default: '* * * * *',
		validate: function(cronExpression){
			return _.isEmpty(cronparser.parseString(cronExpression).errors) ? true : 'Provide a valid crontab expression';
		}
	},

];


inquirer.prompt(questions, function(answers){
	console.log(answers);
});


