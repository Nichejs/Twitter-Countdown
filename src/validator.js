var fs = require('fs'),
	_ = require('lodash'),
	cronparser = require('cron-parser'),
  	humanToCron = require('human-to-cron');

function Validator(){
	var validator = {
		email: function(email){
			return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
		},
		fileExists: function(path){
			return fs.existsSync(path);
		},
		cronExpression: function(cronExpression){
			if(_.isEmpty(cronparser.parseString(cronExpression).errors)){
        		return true;
      		}
      		var cronExpression = humanToCron(cronExpression);
			return _.isEmpty(cronparser.parseString(cronExpression).errors);
		},
		date: function (dateInput){
			return Date.parse(dateInput) > 0;
		}
	};
	return validator;

};
module.exports = Validator;