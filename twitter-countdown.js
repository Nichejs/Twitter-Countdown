var cowsay = require('cowsay'),
	inquirer = require('inquirer'),
	fs = require('fs');

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
			return fs.existsSync(filename) ? true : 'File ' + filename + ' does not exist.'
		}
	}
];


inquirer.prompt(questions, function(answers){
	console.log(answers);
});


