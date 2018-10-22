'use strict';
const issue = require('../../../database').issue;
function solve() {
}

solve.prototype.solve = function(req,res) {
	issue.findById(req.body.issueid)
	.then(issues => issues
		.update({
			"solved": 1,
			"solvedat": new Date(),
			"solvedby": req.session.uid,
			"solution": req.body.solution
		})
		.then(() => {
			res.status(200).send("Issue has been resolved");
		})
		.catch((error) => {
			res.status(400).send("Could not resolve issue");
		})
	)
	.catch((error) => {
		res.status(400).send("Could not find issue");
	})
};

module.exports = solve;
