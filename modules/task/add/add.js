'use strict';
const task = require('../../../database').task;
function add() {
}

add.prototype.add = function(req,res) {
	task.create({
		"task": req.body.task,
		"instructions": req.body.instructions,
		"active": 1
	})
	.then(() => {
		res.status(200).send("Acknowledged");
	})
	.catch((error) => {
		res.status(400).send("Failed to create task");
	})
};

module.exports = add;
