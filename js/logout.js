function logout() {
	$.ajax({
		type: "POST",
		url: 'user/logout',
		datatype: "html",
		success: function() {
			window.location = "/";
		}//,
	//	error: function() {
	//		document.getElementById("result").innerHTML = "Could not authenticate you";
	//	}
	});
}
