$(document).ready(function(){
        populateRooms();
});
function populateRooms(){
        $.ajax({
                type: 'GET',
                url: 'room/get',
                dataType: 'json',
                success: function(response){
                        sessionStorage.rooms = JSON.stringify(response);
                        tbl = "<table><tr><th>Room ID</th><th>Building</th><th>Room</th><th>enabled</th></tr>";
                        $.each(response, function(id,data){
                                tbl += '<tr>';
                                $.each(data, function(id,d2){
                                        tbl += "<td>" + d2 + "</td>";
                                });
                                tbl += '</tr>';
                        });
                        tbl += "</table>";
                        $('#Rooms').html(tbl);
                },
                error: function(){
                        $('#Rooms').html('Failed to get rooms form the server.');
                }
        });
}

function editExistingRoom(){
        var roomID = parseInt($("#existingRoom").val(), 10);
        var state = $("#roomEnable").val();
        var bool
        if(state == "enabled")
                bool = 1;
        if(state == "disabled")
                bool = 0;
        jsd = {
                "roomcode" : roomID,
                "active" : bool,
        }
        $.ajax({
                type: 'PUT',
                url: 'room/able',
                data: jsd,
                success: function(){
                        populateRooms();
                },
                error: function(){
                        alert("There was an error updating status.");
                }
        });
}

function makeRoom(){
        var Building = $("#Building").val();
        var Room = $("#Room").val();
        jsd = {
                "building" : Building,
                "roomnumber" : Room,
        }
        $.ajax({
                type: 'PUT',
                url: 'room/add',
                data: jsd,
                success: function(){
                        populateRooms();
                },
                error: function(){
                        alert("There was an error adding the room.");
                }
        });
}
