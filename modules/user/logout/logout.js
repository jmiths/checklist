'use strict';

var EventEmitter = require('events').EventEmitter;
var utils = require('util');

function logout() {
	EventEmitter.call(this);
}
utils.inherits(logout,EventEmitter);

logout.prototype.logout = function(req,res) {
	req.session.reset();
	res.status(200).send();
};

module.exports = logout;
