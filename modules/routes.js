module.exports = function(app) {
	var issue = require('./issue/issue.js');
	app.post('/issue/:type',issue.issue);

	var render = require('./render/render.js');
	app.get('/render/:type',render.render);

	var room = require('./room/room.js');
	app.put('/room/able',room.room);
	app.put('/room/add',room.room);
	app.get('/room/get',room.room);

	var schedule = require('./schedule/schedule.js');
	app.post('/schedule/:type',schedule.schedule);

	var checkoff = require('./checkoff/checkoff.js');
	app.post('/checkoff/:type',checkoff.checkoff);

	var task = require('./task/task.js');
	app.post('/task/:type',task.task);

	var user = require('./user/user.js');
	app.post('/user/:type',user.user);
}
