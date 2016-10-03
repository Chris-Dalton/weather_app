$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position.coords.latitude, position.coords.longitude);

//bootstrap switch
$("[name='my-checkbox']").bootstrapSwitch('state', false);
          

//Get City and State and place into location field.
$.getJSON('//api.wunderground.com/api/d9631bbbc8a29740/geolookup/q/' + position.coords.latitude + ',' + position.coords.longitude + '.json', function(data) {

//data to display users current city,state, and country location
$("h1").append(data.location.city + ", " + data.location.state);
$("h3").append(data.location.country);

//Get Weather Data and append it to appropriate box
      $.getJSON('//api.wunderground.com/api/d9631bbbc8a29740/conditions/q/' + data.location.state + '/' + data.location.city + '.json', function(conditions) {

//Temp
$("#tempBox").append(conditions.current_observation.temp_f + " F");

//windspeed
       $("#windSpeed").append(conditions.current_observation.wind_mph + " MPH");
//humidity
       $("#humidity").append(conditions.current_observation.relative_humidity);

//icon
$("#iconBox").css({
          'background-image': 'url(' + conditions.current_observation.icon_url + ')',
          'background-repeat': 'no-repeat',
          'background-position': 'center center',
          'background-size': 'contain'
        });
      });
    });

  });

});