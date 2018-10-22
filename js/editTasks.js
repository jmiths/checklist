$(document).ready(function(){
	populateTasks();
});
function populateTasks(){
	$.ajax({
		type: 'POST',
		url: 'task/get',
		dataType: 'json',
		success: function(response){
			sessionStorage.tasks = JSON.stringify(response);
			tbl = "<table><tr><th>Task ID</th><th>Task Name</th><th>Instructions</th><th>enabled</th></tr>";
			$.each(response, function(id,data){
				tbl += '<tr>';
				$.each(data, function(id, d2){
					tbl += "<td>" + d2 + "</td>";
				});
				tbl += '</tr>';
			});
			tbl += "</table>";
			$('#Tasks').html(tbl);
		},
		error: function(){
			$('#Tasks').html('Failed to get tasks from the server.');
		}
	});
}

function editExistingTask(){
	var taskID = parseInt($('#existingTask').val(), 10);
	var newName = $('#taskName').val();
	var newInstructions = $('#taskInstructions').val();
	jsd = {
		"taskid" : taskID,
		"task" : newName,
		"instructions" : newInstructions,
	}
	$.ajax({
		type: 'POST',
		url: 'task/modify',
		data: jsd,
		success: function(){
			populateTasks();
		},
		error: function(){
			alert("There was an error updating status.");
		}
	});
}

function makeTask(){
	var task = $('#taskName').val();
	var instructions = $('#taskInstructions').val();
	jsd = {
		"task" : task,
		"instructions" : instructions,
	}
	$.ajax({
		type: 'POST',
		url: 'task/add',
		data: jsd,
		success: function(){
			populateTasks();
		},
		error: function(){
			alert("There was an error adding the task.");
		}
	});
}		
