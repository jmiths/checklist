function alertSchedule () {
	var checklist = $("#checklist");
	var roomcode = sessionStorage.roomcode;
	checklist.empty();
	$.ajax({
		type:'POST',
		url: 'checkoff/get',
		datatype: 'json',
		data: { "roomcode" : roomcode },
		success: function (response) {
			if (jQuery.isEmptyObject(response)) {
				checklist.html("There are no tasks for this room at the current time.");
			} else {
				$.each(response, function(id, roomInfo) {
					var task = roomInfo.task.task;
					var taskId = roomInfo.taskid;
					var instruction = roomInfo.task.instructions;
					checklist.append(checkboxLine(task, taskId, instruction));
				});
			}
		},
		error: function (msg, error) {
			console.log(msg, error);
			$("#response").html("Failed to retreive rooms from database.");
		}
	});
}

// Generates a checkbox with the task as text and a button for detailed instructions.
function checkboxLine(task, taskId, instruction) {
	var image = '<img class="details" src="qmark.svg" alt="details">';
	var link = '<a href="javascript:alert(\'' + instruction + '\');">' + image  + '</a>';
	return '<input type="checkbox" id="' + taskId + '"+ value="' + task + '">' + task + ' ' + link + '<br>';
}

function submitChecklist() {
	var checkboxes = $("input:checkbox");
	var completed = true;
	var proceed = true;
	var tasks = Array();
	var roomcode = sessionStorage.roomcode;
	$.each(checkboxes, function(id, checkItem) {
		console.log(checkItem);
		if (checkItem.checked) {
			tasks.push(checkItem['id']);
		} else {
			completed = false;
		}
	});
	if (!completed) {
		proceed = confirm("Not all tasks have been completed. Do you wish to submit?");
	}
	if (proceed) {
		$.each(tasks, function(id, taskId) {
			$.ajax({
				type:'POST',
				url: 'checkoff/complete',
				datatype: 'json',
				data: { "roomcode" : roomcode,
					"taskid" : taskId },
				success: function (msg) {
					console.log("success: ", msg);
				},
				error: function (msg, error) {
					console.log(msg, error);
					$("#response").html("Failed to retreive rooms from database.");
				}
			});
		});
	resetChecklist();
	}
}

function resetChecklist() {
	$("#checklist").html('<p style="text-align:center">Your checklist will appear here</p>');
}
