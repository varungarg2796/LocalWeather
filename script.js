//Some javascript will come here
//
//
//
var lati;
var longi;
//api key - 2d11371484be072a931fa3ec4815f349
//http://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=2d11371484be072a931fa3ec4815f349
//json request from above.
//do this to get only the city name from search bar.
var stri= "Varun was, is bad";
var heythere= stri.indexOf(',');
console.log(heythere);
console.log(stri.slice(0,heythere));
var skycons = new Skycons({"color": "white"});
//skycons.add(document.getElementById("icon2"), Skycons.RAIN);
//skycons.play();
//
function getTimeOfCity(json)
{
	longi = json.coord.lon;
	lati = json.coord.lat;
	$.getJSON('http://api.geonames.org/timezoneJSON?lat=' + latitude + '&lng=' + longitude + '&username=varungarg2796',
	 function(time) {
			var rawTimeZone = JSON.stringify(time);
			var parsedTimeZone = JSON.parse(rawTimeZone);
			var dateTime = parsedTimeZone.time;
			timeFull = dateTime.substr(11);
			$(".local-time").html(timeFull); //Update local time
			timeHour = dateTime.substr(-5, 2);
	});
}


function getCityWeather()
{	
	var cityEntered= $("#autocomplete").val();
	if (cityEntered=="")
	{
		alert("Please enter a city");
	}
	else 
	{
		$.getJSON("http://api.openweathermap.org/data/2.5/weather?q="+cityEntered+"&appid=2d11371484be072a931fa3ec4815f349",
		 function (data) 
		 {
		            var rawJson = JSON.stringify(data);
		            var json = JSON.parse(rawJson);
		            console.log(json);
		            showWeather(json); //Update Weather parameters
		 });
	}

}

function showWeather(json)
{
	$("#displayWeather").text(json.main.temp);
	var weatherType= json.weather[0].description;
}

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