
function getParameterByName(name, url) { // QUERY STRINGS READY CODE
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));

}
   var productId = getParameterByName("productId"); // Sparar query string

   console.log(productId);
 $(document).ready(function () { 

   var productsURL = "http://medieinstitutet-wie-products.azurewebsites.net/api/products";
   var categoryUrl = "http://medieinstitutet-wie-products.azurewebsites.net/api/categories";
   var getOrders = "https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=42";

   var title = getParameterByName("title"); // Sparar titeln på länken
   var year = getParameterByName("year");  // Sparar år på länken
   var category = getParameterByName("category"); // Sparar kategori på länken
   var price = getParameterByName("price"); // Sparar pris på länken

   console.log(price);

   var results = []; // Skapar en tom vektor för att pusha in den valda produkten

   $.getJSON(productsURL, function (products) {
  // Hämtar produkterna från API och visar dom på skärmen.

    for (var i = 0; i < products.length; i++){ // Loppar genom produkterna
      

     if ( year != null){
      if (products[i].year == year){
         results.push(products[i]);
      $(".showThis").html("Movies released the same year as " +  " " + results[0].name).css("font-size", "20px").animate({ width: "100%", fontSize: "2em", borderWidth: "10px" , float: "center",  
  }, 1500 );

     }
      if (results[0] == null){
          $(".showThis").html("No match found, please try with another movie" +  " ").css("font-size", "20px").animate({ width: "100%", fontSize: "2em", borderWidth: "10px" , float: "center",  
  }, 1500 );  
      }
  }

      if ( price != null){
        if (products[i].price == price){
            results.push(products[i]);
          $(".showThis").html("Movies with similar price as" +  " " + results[0].name).css("font-size", "20px").animate({ width: "100%", fontSize: "2em", borderWidth: "10px" , float: "center",  
  }, 1500 );
              
       }
        if (results[0] == null){
          $(".showThis").html("No match found, please try with another movie" +  " " ).css("font-size", "20px").animate({ width: "100%", fontSize: "2em", borderWidth: "10px" , float: "center",  
  }, 1500 );  
      }
  }
      
      if ( category != null){
        for (var j = 0; j < products[i].productCategory.length; j++) {
          if (products[i].productCategory[j].categoryId == category){
              $('#getCategory').append('<a href="info.html?productId=' + products[i].id + '"><li class="list-group-item link-class"><img src="'+ products[i].imageUrl+'" height="40" width="30" class="img-thumbnail" /> '+products[i].name+' | <span class="text-muted">'+products[i].year+'</span></li></a>');

      
         }
        }     
      }
    }

      // loopar produkterna utanför den stora loopen

        for (var j = 0; j < results.length; j++){
          var randomImage = $("<img>").attr("src", results[j].imageUrl).attr("id", results[j].id).addClass("styleForRandomDiv").addClass("col-xs-4", "<a>");
            randomImage.appendTo($("#showTheMovies"));




          // klickar på bilden, länkar till infosidan
         $(randomImage).css("cursor", "pointer");
          randomImage.on("click", function() {
           console.log(this);
            window.location.href = "info.html?productId=" + this.id;

        });
    }
});
   });



