function Submit() {
	var summary = document.getElementById("subject").value
	var description = document.getElementById("description").value
	var roomcode = sessionStorage.roomcode;
	$.ajax({
		type:'POST',
		url: 'issue/create',
		datatype: 'json',
		data: { "roomcode" : roomcode,
			"summary" : summary,
			"description" : description},
		success: function (response) {
			$("#submit_status").html("Reported was succesfully submitted!");
			console.log("A Report was just submitted");
				},
		error: function (response) {
			$("#submit_status").html("Failed to submit report!");
			console.log("Your Report failed to submit");
		},
		
	});
}

