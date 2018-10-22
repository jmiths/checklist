'use strict';

function admin() {
}

admin.prototype.admin = function(req,res) {
	if(req.session.admin == 1)
		res.status(200).send({ "admin" : true });
	else
		res.status(200).send({ "admin" : false });
};

module.exports = admin;
