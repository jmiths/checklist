'use strict';
const schedule = require('../../../database').schedule;
function add() {
}

add.prototype.add = function(req,res) {
	schedule.create({
		"roomcode": req.body.roomcode,
		"taskid": req.body.taskid,
		"sunday": req.body.sunday,
		"monday": req.body.monday,
		"tuesday": req.body.tuesday,
		"wednesday": req.body.wednesday,
		"thursday": req.body.thursday,
		"friday": req.body.friday,
		"saturday": req.body.saturday
	})
	.then(() => {
		res.status(200).send("Acknowledged");
	})
	.catch((error) => {
		res.status(400).send("Task in the room has already been scheduled");
	})
};

module.exports = add;
