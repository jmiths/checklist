'use strict';
const completion = require('../../../database').completion;

function complete() {
}

complete.prototype.complete = function(req,res) {
	completion.create({
		"roomcode": req.body.roomcode,
		"taskid": req.body.taskid,
		"uid": req.session.uid,
		"timestamp": new Date()
	})
	.then(() => {
		res.status(200).send("Task recorded");
	})
	.catch((error) => {
		res.status(400).send("Could not complete task");
	})
};

module.exports = complete;
