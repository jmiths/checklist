'use strict';

function menu() {
}

menu.prototype.menu = function(req) {
	var html = "";
	if(req.session.admin)
	{
		html += '<button onClick="window.location=\'/editRooms.html\'">Edit Rooms</button><br>';
		html += '<button onClick="window.location=\'/editTasks.html\'">Edit Tasks</button><br>';
		html += '<button onClick="window.location=\'/editSchedule.html\'">Edit Schedules</button></br>';
		html += '<button onClick="window.location=\'/logs.html\'">View logs</button><br>';
	}
	html += '<button onClick="window.location=\'/issueLogs.html\'">View Issue Logs</button><br>';
	html += '<button onClick="window.location=\'/rooms.html\'">Work on a Room</button><br>';
	html += '<button onClick="window.location=\'/issue.html\'">Report a problem</button><br>';
	return html;
};

module.exports = menu;
