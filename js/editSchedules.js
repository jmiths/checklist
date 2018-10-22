$(document).ready(function(){
        populateSchedule();
});
function populateSchedule(){
        $.ajax({
                type: 'POST',
                url: 'schedule/get',
                dataType: 'json',
                success: function(response){
                        sessionStorage.schedule = JSON.stringify(response);
                        tbl = "<table><tr><th>Schedule ID</th><th>Room ID</th><th>Sunday</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th><th>Task ID</th></tr>";
                        $.each(response, function(id,data){
                                tbl += '<tr>';
                                $.each(data, function(id,d2){
					if((id == "task") || (id == "room")){}
					else if((id == "scheduleid") || (id == "roomcode") || (id == "taskid")){
						tbl += "<td>" + d2 + "</td>";
					}
                                        else{
						tbl += "<td>" + numToAmPm(d2) + "</td>";
					}
                                });
                                tbl += '</tr>';
                        });
                        tbl += "</table>";
                        $('#Schedule').html(tbl);
                },
                error: function(){
                        $('#Schedule').html('Failed to get rooms form the server.');
                }
        });
}

function numToAmPm(a){
	switch(a){
		case 0: return "Neither";
		case 1: return "AM";
		case 2: return "PM";
		case 3: return "Both";
	}
}

function editExistingSchedule(){
        var scheduleID = parseInt($("#existingSchedule").val(), 10);
        var sunday = $("#Sunday").val();
	var monday = $("#Monday").val();
	var tuesday = $("#Tuesday").val();
	var wednesday = $("#Wednesday").val();
	var thursday = $("#Thursday").val();
	var friday = $("#Friday").val();
	var saturday = $("#Saturday").val();
	var taskID = parseInt($("#TaskID").val(),10);
        jsd = {
                "scheduleid" : scheduleID,
		"sunday" : sunday,
		"monday" : monday,
		"tuesday" : tuesday,
		"wednesday" : wednesday,
		"thursday" : thursday,
		"friday" : friday,
		"saturday" : saturday,
        }
        $.ajax({
                type: 'POST',
                url: 'schedule/modify',
                data: jsd,
                success: function(){
                        populateSchedule();
                },
                error: function(){
                        alert("There was an error updating schedule.");
                }
        });
}

function makeSchedule(){
        var sunday = $("#Sunday").val();
	var monday = $("#Monday").val();
	var tuesday = $("#Tuesday").val();
	var wednesday = $("#Wednesday").val();
	var thursday = $("#Thursday").val();
	var friday = $("#Friday").val();
	var saturday = $("#Saturday").val();
	var roomID = parseInt($("#RoomID").val(),10);
	var taskID = parseInt($("#TaskID").val(),10);
        jsd = {
		"sunday" : sunday,
		"monday" : monday,
		"tuesday" : tuesday,
		"wednesday" : wednesday,
		"thursday" : thursday,
		"friday" : friday,
		"saturday" : saturday,
		"roomcode" : roomID,
		"taskid" : taskID,
        }
        $.ajax({
                type: 'POST',
                url: 'schedule/add',
                data: jsd,
                success: function(){
                        populateSchedule();
                },
                error: function(){
                        alert("There was an error updating schedule.");
                }
        });
}
