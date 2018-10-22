var EventEmitter = require('events').EventEmitter;
var utils = require('util');

function render() {
	EventEmitter.call(this);
}
utils.inherits(render,EventEmitter);

exports.render = function(req, res) {
	if(req.session.uid == undefined)
		res.status(400).send("Authentication Required");
	else
	{
		switch(req.params.type)
		{
			case "menu":
				var menuer = require('./menu/menu.js');
				var menu = new menuer();
				res.send(menu.menu(req));
				break;
			default:
				res.sendStatus(404);
				break;
		}
	}
};
