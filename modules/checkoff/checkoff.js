function checkoff() {
}

exports.checkoff = function(req, res) {
	if(req.session.uid == undefined)
		res.sendStatus(404);
	switch(req.params.type)
	{
		case "complete":
			var completer = require('./complete/complete.js');
			var complete = new completer();
			complete.complete(req,res);
			break;
		case "get":
			var getter = require('./get/get.js');
			var get = new getter();
			get.get(req,res);
			break;
		case "review":
			var reviewer = require('./review/review.js');
			var review = new reviewer();
			review.review(req,res);
			break;
		default:
			res.sendStatus(404);
			break;
	}
};
