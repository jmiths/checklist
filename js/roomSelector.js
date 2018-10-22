$(document).ready( function() {
	populateBuildingSelect();
});

function populateBuildingSelect() {
	$.ajax({
		type: 'GET',
		url: 'room/get',
		dataType: 'json',
		success: function(response) {
			var buildingSelect = $('#building');
			sessionStorage.rooms = JSON.stringify(response); // store locally in session
			var buildings = [];
			var uniqueBuildings;
			$.each(response, function(id, data) {
				buildings[id] = data.building;
			});
			uniqueBuildings = buildings.filter(function(item, pos, self) {
				return self.indexOf(item) == pos;
			});
			$.each(uniqueBuildings, function(id, item) {
				buildingSelect.append('<option>' + item + '</option>');
			});
			buildingSelect.trigger("onchange"); // let the select know it "changed"
		buildingSelect.trigger("onchange"); // let the select know it "changed"
		},
		error: function() {
			$('#results').html('failed to get rooms from server');
		}
	});
}

// Populates the Room dropdown. populateBuildingSelect() needs to run first.
function populateRoomSelect() {
	var building = $('#building').val();
	var roomSelect = $('#room');
	var roomData = JSON.parse(sessionStorage.rooms); // read from session
	roomSelect.empty(); // clear out any existing options
	$.each(roomData, function(id, data) {
		if (data.building == building) {
			roomSelect.append('<option>' + data.roomnumber  + '</option>');
		}
	});
	roomSelect.trigger("onchange");
}

// Store the selected roomcode in the session. Should be bound to a selector onChange().
function storeRoomcode() {
	var building = $('#building').val();
	var roomnumber = $('#room').val();
	var roomData = JSON.parse(sessionStorage.rooms);
	$.each(roomData, function(id, data) {
		if (data.building == building && data.roomnumber == roomnumber) {
			sessionStorage.roomcode = data.roomcode;
		}
	});
}
