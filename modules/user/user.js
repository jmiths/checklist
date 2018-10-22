function user() {
}
exports.user = function(req, res) {
	switch(req.params.type)
	{
		case "admin":
			var adminer = require('./admin/admin.js');
			var admin = new adminer();
			admin.admin(req,res);
			break;
		case "authed":
			var autheder = require('./authed/authed.js');
			var authed = new autheder();
			authed.authed(req,res);
			break;
		case "login":
			var loginer = require('./login/login.js');
			var login = new loginer();
			login.login(req,res);
			break;
		case "logout":
			var logouter = require('./logout/logout.js');
			var logout = new logouter();
			logout.logout(req,res);
			break;
		case "search":
			var searcher = require('./search/search.js');
			var search = new searcher();
			search.search(req,res);
			break;
		default:
			res.sendStatus(404);
			break;
	}
};
