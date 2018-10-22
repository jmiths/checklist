function room() {
}
exports.room = function(req, res) {
	if(req.session.uid == undefined)
		res.status(400).send("Authentication Required");
	else
	{
		switch(req.route.path)
		{
			case "/room/able":
				var abler = require('./able/able.js');
				var able = new abler();
				able.able(req,res);
				break;
			case "/room/add":
				var adder = require('./add/add.js');
				var add = new adder();
				add.add(req,res);
				break;
			case "/room/get":
				var getter = require('./get/get.js');
				var get = new getter();
				get.get(req,res);
				break;
			default:
				res.sendStatus(404);
				break;
		}
	}
};
