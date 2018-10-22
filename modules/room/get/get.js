'use strict';

const room = require('../../../database').room;

function get() {
}

get.prototype.get = function(req, res) {
	room.findAll({
	})
	.then((rooms) => {
		res.status(200).send(rooms);
	})
	.catch((error) => {
		res.status(400).send("Failed to get rooms");
	})
};

module.exports = get;
