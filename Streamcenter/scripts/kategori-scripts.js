var listWithMovies = [];
$(document).ready(function () {


    //funktion som hämtar det aktiva url-värdet på sidan
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    var categoryURL = "https://medieinstitutet-wie-products.azurewebsites.net/api/categories";
    var productURL = "http://medieinstitutet-wie-products.azurewebsites.net/api/products";

    //Api anrop för att hämta kategorinamn
    $.getJSON(categoryURL, function (categoryData) {
        var catgoryId = getParameterByName("id");
        if (catgoryId == "all") {
            $("#categoryHeader").text("All Movies");
        }

        for (var i = 0; i < categoryData.length; i++) {

            if (catgoryId == categoryData[i].id) {
                $("#categoryHeader").text(categoryData[i].name);
            }
        }
    });

    //Anrop mot Produkt-API
    $.getJSON(productURL, function (results) {

        //Skapar en variabel för url-funtionen
        var categoryIdFromQueryString = getParameterByName("id");

        if (categoryIdFromQueryString != "all") {
            console.log(categoryIdFromQueryString);

            for (var i = 0; i < results.length; i++) {
                var allCategories = results[i];
                for (var j = 0; j < allCategories.productCategory.length; j++) {
                    var allCategoryId = allCategories.productCategory[j];

                    if (allCategoryId.categoryId == categoryIdFromQueryString) {
                        listWithMovies.push(results[i]);
                    }
                }
            }
        } else {
            for (i = 0; i < results.length; i++) {
                listWithMovies.push(results[i])
            }
        }
        listWithMovies = _.sortBy(listWithMovies, "name");
        displayMovies(listWithMovies);
    });


    /**
     * Filterfunktion som filtrerar/sorterar på namnet i filmens titel
     */
    var controller = false;
    $("#filterName").on("click", function () {
        var sortedList = _.sortBy(listWithMovies, "name");

        $("#filterNameDiv").find("span").show();
        $("#filterDateDiv").find("span").hide();
        $("#filterPriceDiv").find("span").hide();
        $("#filterYearDiv").find("span").hide();

        if (!controller) {
            displayMovies(sortedList);
            $("#filterNameDiv")
                .find("span")
                .removeClass("glyphicon-chevron-up")
                .addClass("glyphicon-chevron-down")
                .addClass("position");
            controller = true;
        } else {
            sortedList.reverse();
            displayMovies(sortedList);
            $("#filterNameDiv")
                .find("span")
                .removeClass("glyphicon-chevron-down")
                .addClass("glyphicon-chevron-up")
                .addClass("position");

            controller = false;
        }


    });

    /**
     * Filterfunktion som filtrerar/sorterar på filmens tillägsdatum
     */
    $("#filterDate").on("click", function () {
        var sortedList = _.sortBy(listWithMovies, "added");

        $("#filterNameDiv").find("span").hide();
        $("#filterDateDiv").find("span").show();
        $("#filterPriceDiv").find("span").hide();
        $("#filterYearDiv").find("span").hide();

        if (!controller) {
            displayMovies(sortedList);
            $("#filterDateDiv")
                .find("span")
                .removeClass("glyphicon-chevron-up")
                .addClass("glyphicon-chevron-down")
                .addClass("position");
            controller = true;
        } else {
            sortedList.reverse();
            displayMovies(sortedList);
            $("#filterDateDiv")
                .find("span")
                .removeClass("glyphicon-chevron-down")
                .addClass("glyphicon-chevron-up")
                .addClass("position");

            controller = false;
        }
    });

    /**
     * Filterfunktion som filtrerar/sorterar på filmens pris
     */
    $("#filterPrice").on("click", function () {
        var sortedList = _.sortBy(listWithMovies, "price");

        $("#filterNameDiv").find("span").hide();
        $("#filterDateDiv").find("span").hide();
        $("#filterPriceDiv").find("span").show();
        $("#filterYearDiv").find("span").hide();

        if (!controller) {
            displayMovies(sortedList);
            $("#filterPriceDiv")
                .find("span")
                .removeClass("glyphicon-chevron-up")
                .addClass("glyphicon-chevron-down")
                .addClass("position");

            controller = true;
        } else {
            sortedList.reverse();
            displayMovies(sortedList);
            $("#filterPriceDiv")
                .find("span")
                .removeClass("glyphicon-chevron-down")
                .addClass("glyphicon-chevron-up")
                .addClass("position");

            controller = false;
        }
    });

    /**
     * Filterfunktion som filtrerar/sorterar på filmens år
     */
    $("#filterYear").on("click", function () {
        var sortedList = _.sortBy(listWithMovies, "year");

        $("#filterNameDiv").find("span").hide();
        $("#filterDateDiv").find("span").hide();
        $("#filterPriceDiv").find("span").hide();
        $("#filterYearDiv").find("span").show();

        if (!controller) {
            displayMovies(sortedList);
            $("#filterYearDiv")
                .find("span")
                .removeClass("glyphicon-chevron-up")
                .addClass("glyphicon-chevron-down")
                .addClass("position");

            controller = true;
        } else {
            sortedList.reverse();
            displayMovies(sortedList);
            $("#filterYearDiv")
                .find("span")
                .removeClass("glyphicon-chevron-down")
                .addClass("glyphicon-chevron-up")
                .addClass("position");

            controller = false;
        }
    });

   // Funktion för att visa alla filmerna på skärmen.

    function displayMovies(results) {


        if ($(".movieInfo").length) {
            $(".movieInfo").remove();
        }

        for (var i = 0; i < results.length; i++) {
            var newProduct = $("<div>")
                .attr("id", results[i].id)
                .addClass("divDesign")
                .addClass("movieInfo")
                .addClass("col-sm-6")
                .addClass("col-2")
                .on("click", function () {
                });

            //Skriver ut bilderna, titel, beskrivning, år, kategori, pris och knapparna till info och lägg till i varukorg på sidan
            var imageDiv = $("<div>").addClass("imageDiv");
            var textDiv = $("<div>").addClass("textDiv");
            var buttonGo = $("<a>").text("Info").attr("id", results[i].id).addClass("btn btn-primary btnGo").on("click", function () {
                window.location = "info.html?productId=" + this.id; 
            });                   
            var buttonBuy = $("<a>").text("Buy").addClass("btn btn-primary btnBuyMovie").attr("movieid", results[i].id).click(addToCart);

            //När man trycker på bilden länkar den till sin rätta info-sida (syfte för tablets och mobile)
            var newImage = $("<img>").attr( {"src": results[i].imageUrl, "id": results[i].id} ).addClass("apiPictures").on("click", function () {
                window.location = "info.html?productId=" + this.id; 
            });                   
            var productInfo = $("<p>").text("Titel: " + results[i].name).addClass("productText");
            var description = $("<p>").text("Plot: " + results[i].description).addClass("productDescription");
            var year = $("<p>").text("Year: " + results[i].year).addClass("productYear");
            var imdb = $("<a>").text("Read more here").attr({"href": "", target: "_blank"}).addClass("movieMoreInfo").attr("id", results[i].id + "_imbd");
            var price = $("<p>").text("Price: " + results[i].price).addClass("productPrice");
            

            newImage.appendTo($(imageDiv));
            productInfo.appendTo($(textDiv));
            description.appendTo($(textDiv));
            year.appendTo($(textDiv));
            imdb.appendTo($(textDiv));     
            price.appendTo($(textDiv));
            buttonGo.appendTo($(textDiv));
            buttonBuy.appendTo($(textDiv));

            imageDiv.appendTo($(newProduct));
            textDiv.appendTo($(imageDiv));
            newProduct.appendTo($("#kategoriContainer"));

           //Ajax-anrop för att hämta ett omdb-api för extern info om filmen (länk till imdb)
            $.ajax({
                url: "http://www.omdbapi.com/?t=" + results[i].name + "&apikey=1157ec03", 
                method: "GET",
                async: false,
                success: function(omdbResult){
                    console.log(omdbResult.imdbID);
                    var imdbLink = "http://www.imdb.com/title/" + omdbResult.imdbID;
                    $("#" + results[i].id + "_imbd").attr("href", imdbLink);   
                },
                error: function(error) {
                    console.log("ERROR")
                }
            });
        }
    }

    $("textDiv").hide();
});

    //Utför snabbköpsfunktionen som sparas i local storage  

    function addToCart() {
        console.log("KÖP");
        var movieId = $(this).attr("movieid");
        

        if (localStorage.getItem("shoppingCart") !== null) {
            var shoppingCartFromLS = JSON.parse(localStorage.getItem("shoppingCart"));


            //Bryt ur och gör den så man fattar vad den gör
            var isFound = shoppingCartFromLS.some(function (item) {
                var isFound = item.id == movieId;
                item.amount += isFound ? 1 : 0;

                return isFound;
            });
            if (!isFound) {
                shoppingCartFromLS.push({id: movieId, amount: 1})
            }
            localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartFromLS));

        }
        if (localStorage.getItem("shoppingCart") == null) {
            var shoppingCartFromLS = [];

            var newShoppingCart = new ShoppingCart(movieId, 1);

            shoppingCartFromLS.push(newShoppingCart);

            localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartFromLS));


        }
        getAmountOfItems();
        
    }

    function getAmountOfItems() {
        var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
        var noOfItems = [];
        for (var i = 0; i < shoppingCart.length; i++) {
            noOfItems.push(shoppingCart[i].amount);
    
        }
    
        var sum = noOfItems.reduce(function (a, b) {
            return a + b;
        }, 0);
    
        $("#noIfItemsBadge").attr("data-count", sum).addClass("badge");
    }
    
 //Document ready end tag




