$(document).ready(function(){
	getData();
});

function getData(){
	if($("#solved").is(':checked'))
		var solved = 1;
	else
		var solved = 0;
	var editStr = 
	$.ajax({
		type: 'POST',
		url: 'issue/get',
		datatype: "json",
		data: {	"solved" : solved },
		success: function(resp){
			var tbl = "<table><tr><th>Edit</th><th>Building</th><th>Room</th>"+
				"<th>Report Date</th><th>Report Time</th><th>User</th><th>Summary</th>" +
				"<th>Description</th><th>Solved</th><th>Solved Date</th>" + 
				"<th>Solved Time</th><th>Solved By</th><th>Solution</th></tr>";
			for (i=0; i<resp.length; i++) {
				tbl += "<tr>";
				tbl += $("#solved").is(':checked') ? 
					"<td>Disabled</td>" :
					"<td><a href='javascript:editIssue("+resp[i].issueid+");'>Edit</a></td>";
				tbl +=	"<td>" + resp[i].room.building + "</td>" +
					"<td>" + resp[i].room.roomnumber + "</td>" +
					"<td>" + resp[i].reportedat.split("T")[0] + "</td>" +
					"<td>" + resp[i].reportedat.split("T")[1] + "</td>" +
					"<td>" + resp[i].reportedby + "</td>" + 
					"<td>" + alertText("Summary", resp[i].summary) + "</td>" +
					"<td>" + alertText("Description", resp[i].description) + "</td>" +
					"<td>" + resp[i].solved + "</td>";
				if (resp[i].solved == 1) {
					tbl += "<td>" + resp[i].solvedat.split("T")[0] + "</td>" +
					"<td>" + resp[i].solvedat.split("T")[1] + "</td>" +
					"<td>" + resp[i].solvedby + "</td>" +
					"<td>" + alertText("Solution", resp[i].solution) + "</td></tr>";
				} else {
					tbl += "<td>null</td><td>null</td><td>null</td><td>null</td></tr>";
				}
			}
			tbl += "</table>";
			$('#RecordOut').html(tbl);
		},
		error: function(message, error){
			console.log("Error: " + error);
		}
	});
}

function alertText(name, text) {
	return '<a href="javascript:alert(\'' + text + '\');">' + name + '</a>';
}

function editIssue(issueid) {
	$("#issueEdit").css('display', 'block');
	sessionStorage.currentIssue = issueid;
	window.location.hash = "issueEdit";
}

function hideEditIssue() {
	$("#issueEdit").css('display', 'none');
	$("#solution").val('');
	getData();
	$('body').scrollTop(0);
}

function submitSolution() {
	var solution = $("#solution").val();
	var issueid = sessionStorage.currentIssue;
	$.ajax({
		type: 'POST',
		url: 'issue/solve',
		datatype: 'json',
		data: { "issueid" : issueid,
			"solution" : solution },
		success: function (response) {
			hideEditIssue();
		},
		error: function (meesage, error) {
			solution.val = "Failed to submit.";
		}
	});
}
