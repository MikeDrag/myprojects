
$(document).ready(function () {
  var API_KEY = "8d58498d8424803c2e79df889ad1bf1c"; // Declare API KEY to load the api from the extern website.
$(function(){ //run the function to getjson
    var loc; //declaring a variable
  
    $.getJSON('http://ipinfo.io', function(d){
  console.log("Assining the data")
    loc = d.loc.split(",");
  console.log(loc);
  console.log(API_KEY)


    
  $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + loc[0] + "&lon=" + loc[1] + "&APPID=" + API_KEY + "&units=metric",
function (wd){
    console.log(" get the data ,", wd);
    var currentLocation = wd.name;
    var currentWeather = wd.weather[0].description;
    var currentTemp = wd.main.temp;
    var high = wd.main.temp_max;
    var low = wd.main.temp_min;
    var pic = wd.weather[0].icon;
    var country = wd.sys.country;
    console.log(wd.main);


  
    $('#getLocation').html("Country:" + country + "<br>" + "Location:" + currentLocation);
    $('#showTemp').html("Temperature:" + currentTemp + "F");
    $('#temperature').html(currentTemp );
    //$("#minMaxTemp").html(JSON.stringify(high + low));
    $("#myButn").click(function(){
    var valNum = parseFloat(currentTemp);
    var convertThis = (valNum -32)/ 1.8;
    console.log(convertThis);
    var convertedThis = Math.round(convertThis);
    $("#outputCelsius").html(convertedThis + "&#8451");
        var div = $("#buttonBox");
        div.animate({height: '300px', opacity: '0.4'}, "slow");
        div.animate({width: '300px', opacity: '0.8'}, "slow");
        div.animate({height: '100px', opacity: '0.4'}, "slow");
        div.animate({width: '100px', opacity: '0.8'}, "slow");
        div.html("Converted Done");
    $("#buttonBox").hide(4000);
    $("#showTemp").hide(4000);
    $("#outputFahren").css("visibility", "visible");
    $("#outputFahren").click(function(){
    $('#showTemp').show("Temperature:" + currentTemp + "F");
    $("#secondButtonBox").hide(20000);
    $(".container").hide(20000);
    });
   })
 })
})
});
});
