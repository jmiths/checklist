'use strict';
var ldap = require('ldapauth-fork');
var fs = require('fs');

var ldapOptions = JSON.parse(fs.readFileSync('/root/.ldap'));

var tlsOptions = {
	key: fs.readFileSync('/root/ssl/ldap-proxy2.key'),
	cert: fs.readFileSync('/root/ssl/ldap-proxy2.crt'),
	ca: fs.readFileSync('/root/ssl/cs_CA2.crt'),
	rejectUnauthorized: false
};

var options = {
	url: ldapOptions.url,
	bindDn: ldapOptions.bindDn,
	bindCredentials: ldapOptions.bindpw,
	groupSearchBase: ldapOptions.groupSearchBase,
	groupSearchFilter: ldapOptions.groupSearchFilter,
	searchBase: ldapOptions.searchBase,
	searchFilter: ldapOptions.searchFilter,
	tlsOptions: tlsOptions
};

var auth = new ldap(options);

function uniques(value, index, self) { 
    return self.indexOf(value) === index;
}

function login() {
}

login.prototype.login = function(req,res) {
	var username = req.body.username;
	var password = req.body.password;
	auth.authenticate(username,password,function(err,user) {
		if(err)
		{
			console.log("Login failed for: ", username, " from ", req.connection.remoteAddress);
			res.status(400).send();
		}
		else
		{
			var allowedUsers = (user._groups[0].memberUid.concat(user._groups[1].memberUid)).filter(uniques);
			if(allowedUsers.indexOf(username) == -1)
			{
				res.status(400).send();
			}
			else
			{
				var admin_users = null;
				for(var i = 0; i < user._groups.length; i++)
				{
					if(user._groups[i].cn == "cci-admin")
						admin_users = user._groups[i].memberUid;
				}
				if(admin_users.indexOf(username) != -1)
					req.session.admin = true;
				else
					req.session.admin = false;
				req.session.fullname = user.gecos;
				req.session.uid = user.uid;
				console.log(req.session);
				res.status(200).send();
			}
		}
	});
};

module.exports = login;
