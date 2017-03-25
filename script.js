//Some javascript will come here
//
//
//
var lati;
var longi;
window.onload=function ()
{
	getLocation();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    lati= position.coords.latitude;
    longi= position.coords.longitude;
    console.log(lati);
    console.log(losngi);
}