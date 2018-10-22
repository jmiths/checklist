'use strict';

const schedule = require('../../../database').schedule;

const task = require('../../../database').task;
const room = require('../../../database').room;

schedule.belongsTo(room, { foreignKey: 'roomcode' });
schedule.belongsTo(task, { foreignKey: 'taskid' });

function get() {
}

function all_for_day(array,day,num)
{
	if(num == 1 || num == 2)
	{
		array.push({[day]:num});
		array.push({[day]:3});
	}
	else
		return {[day]:num};
}

get.prototype.get = function(req,res) {
	var opts = {};
	if(req.body.roomcode)
		opts["roomcode"] = req.body.roomcode;
	if(req.body.taskid)
		opts["taskid"] = req.body.taskid;
	if(req.body.day)
		opts["$or"] = [
				{[req.body.day]: 1},
				{[req.body.day]: 2},
				{[req.body.day]: 3}
				];
	else
	{
		opts["$or"] = [];
		if(req.body.sunday)
			all_for_day(opts["$or"],"sunday",req.body.sunday);
		if(req.body.monday)
			all_for_day(opts["$or"],"monday",req.body.monday);
		if(req.body.tuesday)
			all_for_day(opts["$or"],"tuesday",req.body.tuesday);
		if(req.body.wednesday)
			all_for_day(opts["$or"],"wednesday",req.body.wednesday);
		if(req.body.thursday)
			all_for_day(opts["$or"],"thursday",req.body.thursday);
		if(req.body.friday)
			all_for_day(opts["$or"],"friday",req.body.friday);
		if(req.body.saturday)
			all_for_day(opts["$or"],"saturday",req.body.saturday);
		if(opts["$or"].length == 0)
			delete opts["$or"];
	}
	schedule.findAll({
		where: opts,
		include: [
			{model: task},
			{model: room}
			]
	})
	.then((schedules) => {
		res.status(200).send(schedules);
	})
	.catch((error) => {
		res.status(400).send("Problem with the lookup");
	})
};

module.exports = get;
