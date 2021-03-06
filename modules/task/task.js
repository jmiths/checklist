var EventEmitter = require('events').EventEmitter;
var utils = require('util');

function task() {
	EventEmitter.call(this);
}
utils.inherits(task,EventEmitter);

exports.task = function(req, res) {
	if(req.session.uid == undefined)
		res.sendStatus(404);
	switch(req.params.type)
	{
		case "add":
			var adder = require('./add/add.js');
			var add = new adder();
			add.add(req,res);
			break;
		case "get":
			var getter = require('./get/get.js');
			var get = new getter();
			get.get(req,res);
			break;
		case "modify":
			var modifier = require('./modify/modify.js');
			var modify = new modifier();
			modify.modify(req,res);
			break;
		default:
			res.sendStatus(404);
			break;
	}
};
