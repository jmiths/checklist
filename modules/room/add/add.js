'use strict';

const room = require('../../../database').room;

function add() {
}

add.prototype.add = function(req, res) {
	if(req.session.admin)
	{
		room.create({
			"building": req.body.building,
			"roomnumber": req.body.roomnumber,
			"active": 1
		})
		.then(() => {
			res.status(200).send("Room added");
		})
		.catch((error) => {
			res.status(400).send("Failed to add room");
		})
	}
	else
	{
		res.status(400).send("Not allowed to create rooms");
	}
};

module.exports = add;
