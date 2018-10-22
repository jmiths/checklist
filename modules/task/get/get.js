'use strict';

const task = require('../../../database').task;

function get() {
}

get.prototype.get = function(req,res) {
	task.findAll({
		where: {
			"active": 1
		}
	})
	.then((tasks) => {
		res.status(200).send(tasks);
	})
};

module.exports = get;
