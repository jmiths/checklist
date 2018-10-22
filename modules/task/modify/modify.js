'use strict';
const task = require('../../../database').task;
const schedule = require('../../../database').schedule;

function modify() {
}

modify.prototype.modify = function(req,res) {
	task.findById(req.body.taskid)
	.then(tasks => tasks
		.update({
			"active": 0
		})
		.then(() => {
			task.create({
				"task": req.body.task,
				"instructions": req.body.instructions,
				"active": 1
			})
			.then((result) => {
				schedule.update({
					"taskid" : result.taskid
				},
				{
					where:
					{
						"taskid" : req.body.taskid
					}
				})
				.then(() => {
					res.status(200).send("Acknowledged");
				})
				.catch((error) => {
					res.status(400).send("Could not finish the update");
				})
			})
			.catch((error) => {
				res.status(400).send("Bad create");
			})
		})
		.catch((error) => {
			res.status(400).send("Task not updated");
		})
	)
	.catch((error) => {
		res.status(400).send("Task not found");
	})
};

module.exports = modify;
