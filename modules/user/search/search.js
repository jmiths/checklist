'use strict';
var ldap = require('ldapjs');
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
	tlsOptions: tlsOptions
};

function search() {
}

var client = ldap.createClient(options);

search.prototype.search = function(req,res) {
	if(req.session.uid == undefined)
		res.status(400).send("Authentication required");
	else
	{
		var filter = '(uid=' + req.body.username + ')';
		var opts = {
			filter: filter,
			scope: 'sub',
			attributes: 'gecos'
		};
		client.search(ldapOptions.searchBase,opts,function(err,result) {
			result.once('searchEntry', function(entry) {
				res.status(200).send({ "name" : entry.attributes[0].vals[0] });
			});
		});
	}
};

module.exports = search;
