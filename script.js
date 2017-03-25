//Some javascript will come here
//
//
//
var lati;
var longi;

//do this to get only the city name from search bar.
var stri= "Varun, is bad";
var heythere= stri.indexOf(',');
console.log(heythere);
console.log(stri.slice(0,heythere));



var input = document.getElementById('autocomplete');
      var autocomplete = new google.maps.places.Autocomplete(input);
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
    console.log(longi);
}