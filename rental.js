var input;
var property;
var r;
var form = document.querySelector('form');

function loadData() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            r = JSON.parse(xhr.responseText);
            displayData();
        }
    };
    xhr.open("GET", "rentalclients.json", true);
    xhr.send();
}

var title;

function lastnamechanged() {
    input = document.getElementById("lastname").value.toString().toLowerCase();
    property = "last_name";
    title = "Last Name";
    loadData();
}

// showing the form again after selecting a client
var client;
function selectClient(position) {
    form.style.display = 'block';
    client = r[position];
    onupdate();
}

function displayData() {
	var output = "";
    if (input != "") {

    
    output += "<table class='center'>" + "<tr>" +
     "<th>" + "Last Name" + "</th>" +
     "<th>" + "First Name" + "</th>" +
     "<th>" + "Select" + "</th>" + "</tr>";
	for(var i = 0; i < r.length; i++) {
        
        var obj = r[i];
        if (
            property == "last_name" && obj.last_name != undefined && obj.last_name.toString().toLowerCase().startsWith(input)
        ) {	
            output+= "<tr>" + "<td>" + obj.last_name + "</td>";
            output+="<td>" + obj.first_name + "</td>";
            output+="<td>" + "<input type='radio' onclick='selectClient(this.value)' name='client' value='" + i + "'>" + "</tr>";
        }
				
	}
    output += "</table>";
}
    document.getElementById("records").innerHTML=output;
}


// Display .json file info into the form
function onupdate() {
    var data = form.elements;

    data.lname.value = client.last_name;
    data.fname.value = client.first_name;
    data.address.value = client.address;
    data.state.value = client.state_prov;
    data.email.value = client.email;
    data.phone.value = client.phone;

}

function calFunction() {
    var data = form.elements;
    var output = "";
    var price = 0;
    if (data.compact.checked) {
        output = "<span>" + "Compact car" + "</span>";
        price += 15 * data.days.value;
    } else if (data.mid.checked) {
        output = "<span>" + "Mid-size car" + "</span>";
        price += 20 * data.days.value;
    } else if (data.luxury.checked) {
        output = "<span>" + "Luxury car" + "</span>";
        price += 35 * data.days.value;
    } else if (data.van.checked) {
        output = "<span>" + "Van" + "</span>";
        price += 40 * data.days.value;
    }

    if (data.rack.checked) {
        output += "<p>" + "Rack added" + "</p>";
        price += 5 * data.days.value;
    } 
    if (data.gps.checked) {
        output += "<p>" + "GPS added" + "</p>";
        price += 10;
    }
    if (data.seat.checked) {
        output += "<p>" + "Child seat added" + "</p>";
    }
    output += "<p>" + "Total Price: $" + price + "</p>" + "<br>";
    document.getElementById("total").innerHTML=output;
}
