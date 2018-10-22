function renderMenu() {
	$.ajax({
		url: "render/menu",
		dataType: "HTML",
		success: function(res) {
			$("#options").html(res);
		},
		error: function(res) {
			$("#options").html("error: ", res);
		}
	});
}
