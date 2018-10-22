'use strict';
const schedule = require('../../../database').schedule;
const task = require('../../../database').task;
const room = require('../../../database').room;

schedule.belongsTo(room, { foreignKey: 'roomcode' });
schedule.belongsTo(task, { foreignKey: 'taskid' });

function get() {
}

get.prototype.get = function(req,res) {

	var now = new Date();
	
	var day_of_week = now.toLocaleString('en-US', {weekday: 'long'}).toLowerCase();
	var hour = now.getHours();

	var ampm = null;
	if(hour < 13)
		ampm = 1;
	else
		ampm = 2;

	var opts = {};
	opts["$or"] = [
			{[day_of_week]: ampm},
			{[day_of_week]: 3}
			];
	if (req.body.roomcode)
		opts["roomcode"] = req.body.roomcode;
	
	schedule.findAll({
		where: opts,
		include: [
			{model: task},
			{model: room}
			]
	})
	.then(schedules => {
		res.status(200).send(schedules);
	})
	.catch(error => {
		res.status(400).send("nothing found");
	})
};

module.exports = get;
