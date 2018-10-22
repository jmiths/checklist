'use strict';

process.env.TZ = 'America/New_York';

var express = require('express');
var app = express();
app.use(express.static('./html'));
app.use(express.static('./js'));
app.use(express.static('./assets'));

var fs = require('fs');
var certificate = fs.readFileSync('/root/ssl/cci-checklist.cci.drexel.edu.crt');
var privateKey = fs.readFileSync('/root/ssl/cci-checklist.cci.drexel.edu.key');
var credentials = {key: privateKey, cert: certificate};

var https = require('https');
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(443);

var morgan = require('morgan');
app.use(morgan('dev'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var cookie_secret = JSON.parse(fs.readFileSync('/root/.cookie_secret'));
var sessions = require("client-sessions");
app.use(sessions({
	cookieName: 'session', // cookie name dictates the key name added to the request object
	secret: cookie_secret.cookie_secret, // should be a large unguessable string
	duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
	activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));

require('./modules/routes.js')(app);
