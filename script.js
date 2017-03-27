//api key - 2d11371484be072a931fa3ec4815f349
//http://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=2d11371484be072a931fa3ec4815f349
//json request from above.
//do this to get only the city name from search bar.
//skycons.add(document.getElementById("icon2"), Skycons.RAIN);




var lati,long,timeHour,timeFull,weather,temp,cityEntered;

var skycons = new Skycons({"color": "white"});
skycons.add("setSkycon", Skycons.CLEAR_DAY);
skycons.play();

function getTimeOfCity(json)
{
	longi = json.coord.lon;
	lati = json.coord.lat;
	$.getJSON('http://api.geonames.org/timezoneJSON?lat=' + lati + '&lng=' + longi + '&username=varungarg2796',
	 function(time) {
			var rawTimeZone = JSON.stringify(time);
			var parsedTimeZone = JSON.parse(rawTimeZone);
			var dateTime = parsedTimeZone.time;
			timeFull = dateTime.substr(11);
			$("#timePos").html("Time:" + timeFull); //Update local time
			timeHour = dateTime.substr(-5, 2);
			console.log(json.name);
			if (cityEntered== null)
			{
				$("#placePos").text("Place:" + json.name);
			}
	});
}


function getCityWeather()
{	
	cityEntered= $("#autocomplete").val();
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
					$("#placePos").text("Place:"+ cityEntered); //displays the temp
		            getTimeOfCity(json);
		            showWeather(json); //Update Weather parameters
		 });
	}

}

function showWeather(json)
{
	weather= json.weather[0].description;
	temp = (json.main.temp - 273.15).toFixed(0) + "°C",
	$("#tempPos").text("Temperature:" + temp); //displays the temp
	$("#weatherConditionPos").html("Condition:" + json.weather[0].description); //displays the weather condition
	console.log(weather);

		if(weather.indexOf("rain") >= 0) {
			console.log('rain');
			skycons.set("setSkycon", Skycons.RAIN);
		}

		else if (weather.indexOf("sunny") >= 0) {
			console.log('sun');
			skycons.set("setSkycon", Skycons.CLEAR_DAY);
		}

		else if (weather.indexOf("clear") >= 0) {
			if (timeHour >= 7 && timeHour < 20) {
				console.log('clear day');
				skycons.set("setSkycon", Skycons.CLEAR_DAY);
			}

			else {
				console.log('clear night');		
				skycons.set("setSkycon", Skycons.CLEAR_NIGHT);
			}		
		}

		else if (weather.indexOf("cloud") >= 0) {
			if (timeHour >= 7 && timeHour < 20) {

				console.log('cloudy');
				skycons.set("setSkycon", Skycons.PARTLY_CLOUDY_DAY);
			}

			else {
				console.log('cloudy');
				skycons.set("setSkycon", Skycons.PARTLY_CLOUDY_NIGHT);
			}	
		}

		else if (weather.indexOf("thunderstorm") >= 0) {
				console.log('thunderstorm');
			skycons.set("setSkycon", Skycons.SLEET);
		}

		else if (weather.indexOf("snow") >= 0) {
			console.log('thunderstorm');
			skycons.set("setSkycon", Skycons.SNOW);
		}
		else if(weather.indexOf("haze")>=0)
		{
			console.log("haze");
			skycons.set("setSkycon", Skycons.FOG);	
		}
		else if(weather.indexOf("fog")>=0)
		{
			console.log("fog");
			skycons.set("setSkycon", Skycons.FOG);	
		}
		else if(weather.indexOf("mist")>=0)
		{
			console.log("haze");
			skycons.set("setSkycon", Skycons.FOG);	
		}
		else if(weather.indexOf("wind")>=0)
		{
			console.log("wind");
			skycons.set("setSkycon", Skycons.WIND);	
		}
		else
		{
			alert("Skycon not present")
		}
}










var input = document.getElementById('autocomplete');
var autocomplete = new google.maps.places.Autocomplete(input);






//later
window.onload=function ()
{	//getLocation();
	console.log("hereWeGo");
	getLocation();

	var currentPosition;
	function getCurrentLocation (position) {
		currentPosition = position;
		    lati= position.coords.latitude;
		    longi= position.coords.longitude;
		    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lati + "&lon=" + longi + "&APPID=2d11371484be072a931fa3ec4815f349", 
		    	function (data) {
		    	var rawJson = JSON.stringify(data);
		    	var json = JSON.parse(rawJson);
		    	getTimeOfCity(json);
				showWeather(json); //Update Weather parameters
		    });

		
	}

	navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

function getLocation() {
    if (navigator.geolocation) {
    	console.log("Running");
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    lati= position.coords.latitude;
    longi= position.coords.longitude;
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lati + "&lon=" + longi + "&APPID=2d11371484be072a931fa3ec4815f349", 
    	function (data) {
    	var rawJson = JSON.stringify(data);
    	var json = JSON.parse(rawJson);
    	getTimeOfCity(json);
		showWeather(json); //Update Weather parameters
    });
    console.log(lati);
    console.log(longi);
}