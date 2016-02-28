var fs = require('fs'),
	_ = require('lodash'),
	cronparser = require('cron-parser'),
  	humanToCron = require('human-to-cron');

function Filter(){
	var filters = {
		crontab: function(cronExpression){
			return _.isEmpty(cronparser.parseString(cronExpression).errors)
				? cronExpression
				: humanToCron(cronExpression);
		},
		date: function(dateInput){
			return new Date(Date.parse(dateInput));
		}
	};
	return filters;

};
module.exports = Filter;