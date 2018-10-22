function checkAuthed() {
	// Bind enter in password box to trigger login()
	$("#password").keyup(function(event){
		if (event.keyCode == 13) { 
			login();
		}
	});
	
	$.ajax({
		type: 'POST',
		url: 'user/authed',
		data: {},
		datatype: "json",
		success: function(response) {
			if (response.authorized) {
				window.location = 'main_menu.html';
			}
			else {
				$('#loginWindow').css('display', 'block');
			}
		},
		error: function() {
			$('#result').html('failed to check auth');
			$('#result').css('display','block');
		}
	});
}

function login() {
	$.ajax({
		type: 'POST',
		url: 'user/login',
		data: {
			'username': $('#username').val(),
			'password': $('#password').val()
		},
		datatype: "html",
		success: function() {
			window.location = 'main_menu.html';
		},
		error: function() {
			$('#result').html('Could not authenticate you');
			$('#result').css('display','block');
		}
	});
}
