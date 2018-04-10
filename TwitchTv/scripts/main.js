
var urlStreams = 'https://api.twitch.tv/kraken/streams/';
var urlChannels = 'https://api.twitch.tv/kraken/channels/';
var clientId = "llhjbrv1ssh43dt4obd2med8tmce3k";
var streamMovies = "";


$(document).ready()
 $("#twichStreamersDiv").click(function(){
  window.location.reload();
 });

  $.ajaxSetup({
   headers : {   
        'Client-ID' : 'llhjbrv1ssh43dt4obd2med8tmce3k'
      }
  });

var freeCodeCampsJson = $.getJSON('https://api.twitch.tv/kraken/streams/freecodecamp/', function(data) {
  console.log(data);
  if (data.stream == null){
    $("#streamingOrNot").html("Offline");
}
  else if (data.stream != null){
    $("#freeLink").text("Streaming...").attr({"href": "https://www.twitch.tv/freecodecamp", target: "_blank"});// Fråga Harald
  }
});

var eslsJson = $.getJSON('https://api.twitch.tv/kraken/streams/dreadztv/', function(data) {
  console.log(data);
  if (data.stream == null){
    $("#eslStreaming").html("Offline"); 
}
  else if (data.stream != null){
    $("#eslLink").text("Streaming...").attr({"href": "https://www.twitch.tv/dreadztv", target: "_blank"});// Fråga Harald
  }
}); 
var testJson = $.getJSON('https://api.twitch.tv/kraken/streams/test_channel/', function(data) {
  console.log(data);
  if (data.stream == null){
    $("#testStreaming").html("Offline"); 
}
  else if (data.stream != null){
    $("#testLink").text("Streaming...").attr({"href": "https://www.twitch.tv/sampev2", target: "_blank"});// Fråga Harald
  }
   var val1 = $('select').change(function () {
   if (this.value == 1){  
    console.log(this);
    if(freeCodeCampsJson.responseJSON.stream == null){
      $("#streamingOrNot").hide();
     }
     else if(freeCodeCampsJson.responseJSON.stream != null){
      $("#freeLink").text("Streaming...").attr({"href": "https://www.twitch.tv/freecodecamp", target: "_blank"});
     }
     if (eslsJson.responseJSON.stream == null){
       $("#eslStreaming").hide();   
     }
     else if(eslsJson.responseJSON.stream != null){
        $("#eslLink").show().text("Streaming...").attr({"href": "https://www.twitch.tv/dreadztv", target: "_blank"});
     }
     if(testJson.responseJSON.stream == null){
      $("#testStreaming").hide(); 
     }
     else if (testJson.responseJSON.stream != null){
       $("#testLink").text("Streaming...").attr({"href": "https://www.twitch.tv/sampev2", target: "_blank"});      
     }
    }
  })
   var val2 = $('select').change(function () {
    console.log(this);
   if (this.value == 2){  
    if(freeCodeCampsJson.responseJSON.stream == null){
      $("#streamingOrNot").show("Offline");
     }
     else if(freeCodeCampsJson.responseJSON.stream != null){
      $("#freeLink").hide();
     }
     if (eslsJson.responseJSON.stream == null){
       $("#eslStreaming").show("Offline");  
     }
     else if(eslsJson.responseJSON.stream != null){
        $("#eslLink").hide();
      }
     if(testJson.responseJSON.stream == null){
      $("#testStreaming").show("Offline"); 
     }
     else if (testJson.responseJSON.stream != null){
       $("#testLink").hide();
      }
    }  
  })
    var val3 = $('select').change(function () {
    console.log(this);
   if (this.value == 3){  
    window.location.reload();
    }  
  })
});   