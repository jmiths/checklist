function issue() {
}

exports.issue = function(req, res) {
	if(req.session.uid == undefined)
		res.status(400).send("Authentication required");
	else
	{
		switch(req.params.type)
		{
			case "create":
				var creator = require('./create/create.js');
				var create = new creator();
				create.create(req, res);
				break;
			case "get":
				var getter = require('./get/get.js');
				var get = new getter();
				get.get(req, res);
				break;
			case "solve":
				var solver = require('./solve/solve.js');
				var solve = new solver();
				solve.solve(req, res);
				break;
			default:
				res.sendStatus(404);
				break;
		}
	}
};
