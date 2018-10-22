$(document).ready(function(){
	checkAuth();
});
function checkAuth(){
	$.ajax({
		type: 'POST',
		url: 'user/authed',
		data: {},
		datatype: "json",
		success: function(resp){
			if(!resp.authorized){
				window.location = 'index.html';
			}	
		},
		error: function(){
			$('#result').html('failed to check auth');
			$('#result').css('display','block');
		}
	});
}
