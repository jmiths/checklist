'use strict';
const completion = require('../../../database').completion;
const task = require('../../../database').task;
const room = require('../../../database').room;

completion.belongsTo(room, { foreignKey: 'roomcode' });
completion.belongsTo(task, { foreignKey: 'taskid' });

function review() {
}

review.prototype.review = function(req,res) {
	var opts = {};
	if(req.body.uid)
		opts["uid"] = req.body.uid;
	if(req.body.roomcode)
		opts["roomcode"] = req.body.roomcode;
	if(req.body.taskid)
		opts["taskid"] = req.body.taskid;
	if(! req.body.endDate && req.body.startDate)
	{
		opts["timestamp"] = {
			$lt: new Date(),
			$gt: req.body.startDate
		}
	}
	else if(! req.body.startDate && req.body.endDate)
	{
		opts["timestamp"] = {
			$lt: req.body.endDate,
			$gt: new Date(1)
		}
	}
	else if(req.body.startDate && req.body.startDate)
	{
		opts["timestamp"] = {
			$lt: req.body.endDate,
			$gt: req.body.startDate
		}
	}
	completion.findAll({
		where: opts,
		include: [
			{model: task},
			{model: room}
			]
	})
	.then((reviews) => {
		res.status(200).send(reviews);
	})
	.catch((error) => {
		res.status(400).send("Problem with the lookup");
	})
};

module.exports = review;
