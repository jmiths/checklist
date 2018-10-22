'use strict';
const issue = require('../../../database').issue;
function create() {
}

create.prototype.create = function(req, res) {
	issue.create({
		"roomcode": req.body.roomcode,
		"summary": req.body.summary,
		"description": req.body.description,
		"reportedat": new Date(),
		"reportedby": req.session.uid,
		"solved": 0
	})
	.then(() => {
		res.status(200).send("Acknowledged");
	})
	.catch((error) => {
		res.status(400).send("Failed to create issue");
	})
}

module.exports = create;
