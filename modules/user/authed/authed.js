'use strict';

function authed() {
}

authed.prototype.authed = function(req,res) {
	if(req.session.uid == undefined)
		res.status(200).send({ "authorized" : false });
	else
		res.status(200).send({ "authorized" : true });
};

module.exports = authed;
