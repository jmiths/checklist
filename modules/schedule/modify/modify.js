'use strict';
const schedule = require('../../../database').schedule;

function modify() {
}

modify.prototype.modify = function(req,res) {
	schedule.findById(req.body.scheduleid)
	.then(schedules => schedules
		.update({
			"sunday": req.body.sunday,
			"monday": req.body.monday,
			"tuesday": req.body.tuesday,
			"wednesday": req.body.wednesday,
			"thursday": req.body.thursday,
			"friday": req.body.friday,
			"saturday": req.body.saturday
		})
		.then(() => {
			res.status(200).send("Task rescheduled");
		})
		.catch((error) => {
			res.status(400).send("Could not reschedule task");
		})
	)
	.error((error) => {
		res.status(400).send("Schedule not found");
	})
};

module.exports = modify;
