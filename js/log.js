function getData(){
	var StartDate = $('#StartDate').val();
	var EndDate = $('#EndDate').val();
	var UID = $('#UID').val();
	var Roomcode = sessionStorage.roomcode;
	var jsr = {};
	if(StartDate != "")
		jsr["startDate"] = StartDate;
	if(EndDate != "")
		jsr["endDate"] = EndDate;
	if(UID != "")
		jsr["uid"] = UID;
	if($("#checkRooms").is(':checked'))
		jsr["roomcode"] = Roomcode;
	$.ajax({
		type: 'POST',
		url: '/checkoff/review',
		data: jsr,
		datatype: "json",
		success: function(resp){
			tbl = "<table><tr><th>Building</th><th>Room</th><th>Date</th><th>Time</th><th>Task</th><th>User</th></tr>";
			for(i=0; i<resp.length; i++){
				tbl += "<tr><td>" + resp[i].room.building + "</td>" +
					"<td>" + resp[i].room.roomnumber + "</td>" +
					"<td>" + resp[i].timestamp.split("T")[0] + "</td>" +
					"<td>" + resp[i].timestamp.split("T")[1] + "</td>" +
					"<td>" + resp[i].task.task + "</td>" +
					"<td>" + resp[i].uid + "</td></tr>";
			}
			tbl += "</table>";
			$('#RecordOut').html(tbl);
		},
		error: function(){
		}
	});
}
