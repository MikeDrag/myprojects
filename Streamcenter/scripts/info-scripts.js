function getParameterByName(name, url) { // Query strings
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var productsURL = "https://medieinstitutet-wie-products.azurewebsites.net/api/products";
var categoryUrl = "http://medieinstitutet-wie-products.azurewebsites.net/api/categories";
var i, j;
function googleTranslateElementInit() { // Implementerar google translate
new google.translate.TranslateElement({pageLanguage: 'sv', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, multilanguagePage: true}, 'google_translate_element');
}
function getMovieId() { // Funktion för att hämta och visa filmen i skärmen


  //Hämta frågesträngsvariabeln productId.
  //Denna skapas upp från getMovieId.html
var productId = getParameterByName("productId"); // Sparar querysträngen
productsURL = productsURL + "/" + productId; // Länken productsUrl + / + query strängen då visar den filmens ID
  $.getJSON(categoryUrl, function (categoryData) { // Hämtar produkten från kategori API
    $.getJSON(productsURL, function (result) { // Hämtar produkterna från produkt API
      var randomImage = $("<img>").attr("src", result.imageUrl); // Sparar produktens bild
        randomImage.appendTo($("#InfoImg")); // Visar bilden på skärmen

          $(".movieName").text(result.name); // Visar produktens namn
          $(".movieDesc").text(result.description); // Visar produktens info
          $(".movieYear").text(result.year); // Visar produktens år
          $(".moviePrice").text(result.price); // Visar produktens pris
          $("#infoTitle").click(function(){ // Visar produktens namn
});
   $("#infoYear").click(function(){
    $(".movieYear").css( 'cursor', 'pointer' );
     var myYear = document.getElementById("#yearInfo");
      window.open("info2.html?year=" +  result.year, "_self") // Klika på year, öppna ett nytt fönster med filmens år.
  });
  $("#myCategory").click(function(){
     var myCategory = document.getElementById("#myCategory");
      window.open("kategori.html?id=" + result.productCategory[0].categoryId, "_self"); // Klika på category, öppna ett nytt fönster med filmens category.
  });
   
  $("#infoPrice").click(function(){  
     var myPrice = document.getElementById("#priceInfo"); 
        window.open("info2.html?price=" + result.price, "_self") // Klika på price, öppna ett nytt fönster med filmens pris.
  });

  // Användaren hovrar och ser texten nedanför, då vet han vad länkarna är till.
  $("#myCategory").hover(function(){
    $("#myCategory").css( 'cursor', 'pointer' );
     $(this).html("Movies with similar Category" + "(" + lista + ")")
    },);
       $("#linkYear").hover(function(){
        $("#linkYear").css("cursor", "pointer");
          $(this).html("Movies released the same year" + "(" + result.year + ")")
    },);
            $("#linkPrice").hover(function(){
              $("#linkPrice").css("cursor", "pointer");
                $(this).html("Movies with similar Price" + "(" + result.price + "Sek" + ")")
    },);

  var categoryIdFromMovie = ""; // Skapar en tom variabel
  var lista = ""; // Skapar en tom variabel
   for (i = 0; i < result.productCategory.length; i++) { // loopar igenom kategorierna i loopen
      categoryIdFromMovie = result.productCategory[i].categoryId; //  Kategori från filmen är samma som produktens från APi.
        for (j = 0; j < categoryData.length; j++) { // Skapar en till loop 
          if (categoryIdFromMovie == categoryData[j].id) { 
            lista += categoryData[j].name + " "; // lägger kategorin i listan
              $(".movieCategory").text(lista); // Skriver ut kategorin.
          }
       }
    }
  $.getJSON("http://www.omdbapi.com/?t=" + result.name + "&apikey=1157ec03", function(omdbResult){
                
                console.log(omdbResult.imdbID);
                var imdbLink = "http://www.imdb.com/title/" + omdbResult.imdbID;
               $(".movieMoreInfo").attr("href", imdbLink);   
            })
        })
    });
}