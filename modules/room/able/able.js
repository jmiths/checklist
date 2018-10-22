'use strict';

const room = require('../../../database').room;

function able() {
}

able.prototype.able = function(req, res) {
	if(req.session.admin)
	{
		room.findById(req.body.roomcode)
		.then(rooms => rooms
			.update({
				"active": req.body.active
			})
			.then(() => {
				res.status(200).send("Room updated");
			})
			.catch((error) => {
				res.status(400).send("Failed to update room");
			})
		)
		.catch((error) => {
			res.status(400).send("Failed to find room");
		})
	}
	else
	{
		res.status(400).send("Not allowed to able rooms");
	}
};

module.exports = able;
