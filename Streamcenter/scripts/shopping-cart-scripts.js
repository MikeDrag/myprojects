// funktion för att visa orderna i en box när man hovrar på vagnen
$(document).ready(function () {

    if (localStorage.getItem("shoppingCart") != null) {


        $("#noIfItemsBadge").hover(function () {
                $("#shoppingCartDropdown").css("visibility", "visible");
            },
            function () {
                $("#shoppingCartDropdown").css("visibility", "hidden");
            });

        $("#shoppingCartDropdown").hover(function () {
                $("#shoppingCartDropdown").css("visibility", "visible");

            },
            function () {
                $("#shoppingCartDropdown").css("visibility", "hidden");
            });

    } // Skickar användaren till final-ordern när knappen trycks

    $("#btnToFinalOrder").on("click", function () {
        window.location = "final-order.html"
    });

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function ShoppingCart(id, amount) {
        this.id = id;
        this.amount = amount;
    }


    if (localStorage.getItem("shoppingCart") !== null) {
        getAmountOfItems();


        var productsURL = "https://medieinstitutet-wie-products.azurewebsites.net/api/products";
        var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
        var i, j;

// Funktion för att visa allt på skärmen, css samt att användaren ska  kunna lägga till och ta bort  antal valda filmer.


            $.getJSON(productsURL, function (result) {


                var totalAmountToPay = 0;

                for (i = 0; i < result.length; i++) {
                    for (j = 0; j < shoppingCart.length; j++) {
                        var productHtml = "";
                        if (result[i].id == shoppingCart[j].id) {


                            var totalSubPrice = result[i].price * shoppingCart[j].amount;
                            // totalAmountToPay += totalPrice;
                            totalAmountToPay = JSON.parse(localStorage.getItem("totalPrice"));

                            $("#amountToPay").text(totalAmountToPay);

                            console.log("id:" + result[i].id);


                            productHtml += "<div class='row shoppingCartDiv'>" +
                                "<input type='hidden'  class='moviePriceForMovie' value=" + result[i].price + ">" +

                                "<div class='col-md-2'>" +
                                "<a href=\"../html/info.html?productId=" + result[i].id + "\"><img src=" + result[i].imageUrl + "alt='Movie-picture'" + "height='200' width='125' class='moviePicDesign'/></a>" +
                                "</div>";


                            productHtml += "<div class='col-md-2'>" +
                                "<a href=\"../html/info.html?productId=" + result[i].id + "\" ><label class='linkStyle'> " + result[i].name + "</label></a>" +
                                "</div>";

                            productHtml += "<div class='col-md-2'>" +
                                "<label class='score'>" + result[i].price + " SEK </label>" +

                                "</div>";

                            productHtml += "<div class='col-md-2 totalPriceDiv'>" +
                                "<label class='subTotal'>" + totalSubPrice + "</label><label>&nbsp;SEK</label>" +
                                "</div>" +

                                "<div id='cartButtons' class='col-md-4'>" +

                                "<span class='glyphicon glyphicon-minus decreaseAmountBtn moveIcon' data-toggle='tooltip' title='Minska antal' id='" + result[i].id + "'></span>" +

                                "<label class='amountLabel moveIcon'>" + shoppingCart[j].amount + "</label>" +

                                "<span class='glyphicon glyphicon-plus increaseAmountBtn moveIcon' data-toggle='tooltip' title='Öka antal' id='" + result[i].id + "'></span>" +


                                "<span class='glyphicon glyphicon-trash deleteMovieFromShoppingCart moveIcon' data-toggle='tooltip' title='Ta bort alla' id='" + result[i].id + "'></span>" +

                                "</div>" +

                                "</div>";
                            //  document.getElementById("subTotal").innerHTML = totalPrice.toString();

                            console.log("hej");

                            $("#shoppingCartItems").append(productHtml);


                            var cartInnerDiv = $("<div>").addClass("cartInnerDivStyle row");
                            var cartInnerNameAmount = $("<div>").text(result[i].name + " x " + shoppingCart[j].amount).addClass("cartDropDownDiv col-md-10");
                            var delBtn = $("<span>").addClass("glyphicon glyphicon-trash delBtnSHoppDrop col-md-1").attr("id", result[i].id);

                            cartInnerNameAmount.appendTo(cartInnerDiv);
                            delBtn.appendTo(cartInnerDiv);
                            // checkoutBtn.appendTo(cartInnerDiv);

                            $("#shoppingCartDropdown").append(cartInnerDiv);

                        }
                    }
                }
                //
                var totalPay = $("<div>").text("Totalprice: " + totalAmountToPay).attr("id", "totalPayStyle");
                totalPay.appendTo(cartInnerDiv);


                $(".delBtnSHoppDrop").on("click", function () {
                    var i = $(this).attr("id");
                    console.log("idt på filmen är: " + i);
                    var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
                    for (var i = 0; i < shoppingCart.length; i++) {

                        if (shoppingCart[i].id == $(this).attr("id")) {
                            shoppingCart.splice(i, 1);
                            $(this).parent().remove();


                        }
                    }
                    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

                    if (shoppingCart.length == 0 || shoppingCart == null) {

                        localStorage.clear();
                    }
                    getAmountOfItems();


                });


                $("#checkoutBtn").on("click", function () {

                    window.location = "../html/shopping-cart.html";

                });
                // Ökar antal knapp
                $(".increaseAmountBtn").on("click", function () {
                    console.log("Nu ökar vi!");
                    var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
                    for (var i = 0; i < shoppingCart.length; i++) {
                        if (shoppingCart[i].id == $(this).attr("id")) {
                            shoppingCart[i].amount++;
                            localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

                            var amount = shoppingCart[i].amount;

                            var par = $(this).parents(".shoppingCartDiv");
                            var moviePrice = $(".moviePriceForMovie", par).attr("value");

                            var parent = $(this).parents("#cartButtons");
                            $(".amountLabel", parent).text(amount);

                            totalSubPrice = amount * moviePrice;

                            totalAmountToPay = parseInt(totalAmountToPay) + parseInt(moviePrice);
                            console.log("totales: " + totalAmountToPay);
                            localStorage.setItem("totalPrice", JSON.stringify(totalAmountToPay));

                            $("#amountToPay").text(totalAmountToPay);

                            var amountLabelParent = $(this).parents(".shoppingCartDiv");
                            $(".subTotal", amountLabelParent).text(totalSubPrice);


                            getAmountOfItems();
                        }
                    }
                });
                // Minskar antal knapp
                $(".decreaseAmountBtn").on("click", function () {
                    console.log("Nu minskar vi!");
                    var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

                    for (var i = 0; i < shoppingCart.length; i++) {
                        if (shoppingCart[i].id == $(this).attr("id")) {

                            if (shoppingCart[i].amount > 1) {

                                shoppingCart[i].amount--;

                                //Gör så att man inte kan spara negativt antal produkter i LS
                                if (shoppingCart[i].amount <= 0) {
                                    shoppingCart[i].amount = 0;
                                }

                                localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
                                var amount = shoppingCart[i].amount;
                                var parent = $(this).parents("#cartButtons");
                                $(".amountLabel", parent).text(amount);

                                var par = $(this).parents(".shoppingCartDiv");
                                var moviePrice = $(".moviePriceForMovie", par).attr("value");

                                totalSubPrice = amount * moviePrice;

                                totalAmountToPay = parseInt(totalAmountToPay) - parseInt(moviePrice);

                                console.log(totalAmountToPay);
                                $("#amountToPay").text(totalAmountToPay);

                                localStorage.setItem("totalPrice", JSON.stringify(totalAmountToPay));

                                var amountLabelParent = $(this).parents(".shoppingCartDiv");
                                $(".subTotal", amountLabelParent).text(totalSubPrice);

                                getAmountOfItems();
                            }

                        }
                    }
                });


                /**
                 *
                 */
                $(".deleteMovieFromShoppingCart").on("click", function () {
                        console.log("delete");
                        totalAmountToPay = 0;

                        if (confirm("Vill du ta bort filmen ur Din kundkorg!") == true) {

                            var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

                            if (shoppingCart.length == 0 || shoppingCart == null) {

                                localStorage.clear();
                            }

                            for (var i = 0; i < shoppingCart.length; i++) {

                                if (shoppingCart[i].id == $(this).attr("id")) {
                                    shoppingCart.splice(i, 1);
                                }
                            }
                            localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
                            $(this).parent().parent().remove();

                            shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

                            for (var i = 0; i < shoppingCart.length; i++) {

                                var par = $(this).parents(".shoppingCartDiv");
                                var moviePrice = $(".moviePriceForMovie", par).attr("value");

                                totalAmountToPay = shoppingCart[i].amount * moviePrice;
                                localStorage.setItem("totalPrice", JSON.stringify(totalAmountToPay));


                                $("#amountToPay").text(totalAmountToPay);

                                getAmountOfItems();


                            }
                            clearAll();
                        }
                    }
                );

            }); /////



    }

    /**
     * Funktion för att rensa totalsumman som ligger i
     * LS och visar upp 0 som slutsumma att betala
     */
    function clearAll() {
        var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
        if (shoppingCart.length == 0 || shoppingCart == null) {
            localStorage.clear();

            //sätter summan att betala till 0 för att
            // visa att det inte finns något som ska betalas
            $("#amountToPay").text(0);

        }
    }

    /**
     * Funktion för att visa en alert-success när användaren trycker på köpknappen
     * som visar att en film har lagts till i varukorgen
     */
    function showAlertMovieAdded() {
        $("#alertForAddedMovie").removeClass("hidden");
    }


    $("#btnBuyMovie").on("click", function () {
        var movieId = getParameterByName("productId");
        var amount = 1;

        var moviePrice = $(".moviePrice").html();
        console.log(moviePrice);

        if (localStorage.getItem("totalPrice") != null) {

            var moviePriceFromLS = JSON.parse(localStorage.getItem("totalPrice"));
            moviePrice = parseInt(moviePriceFromLS) + parseInt(moviePrice);
            localStorage.setItem("totalPrice", JSON.stringify(moviePrice));
        } else {
            localStorage.setItem("totalPrice", JSON.stringify(moviePrice));
        }

        if (localStorage.getItem("shoppingCart") !== null) {
            var shoppingCartFromLS = JSON.parse(localStorage.getItem("shoppingCart"));

            var isFound = false;

            for (var i = 0; i < shoppingCartFromLS.length; i++) {
                if (shoppingCartFromLS[i].id == movieId) {
                    shoppingCartFromLS[i].amount++;
                    isFound = true;
                    break;
                }
            }

            /*   var isFound = shoppingCartFromLS.some(function (item) {
                   var isFound = item.id == movieId;
                   item.amount += isFound ? 1 : 0;

                   return isFound;
               });*/
            if (!isFound) {
                shoppingCartFromLS.push({id: movieId, amount: 1})
            }
            localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartFromLS));

        }
        if (localStorage.getItem("shoppingCart") == null) {
            var shoppingCartFromLS = [];

            var newShoppingCart = new ShoppingCart(movieId, amount);

            shoppingCartFromLS.push(newShoppingCart);

            localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartFromLS));


        }

        getAmountOfItems();
        //  updateShoppingCartDropdown(movieId);

        showAlertMovieAdded();

    });

    function updateShoppingCartDropdown(movieId) {
        $.getJSON("https://medieinstitutet-wie-products.azurewebsites.net/api/products/" + movieId, function (movie) {
            if ($("#" + movieId, $("#shoppingCartDropdown")).length > 0) {
                // Detta är div:en med amount i sig
                $("#" + movieId, $("#shoppingCartDropdown")).prev()
            }

            var cartInnerDiv = $("<div>").addClass("cartInnerDivStyle row");


            var amount = 0;
            for (var i = 0; i < shoppingCart.length; i++) {
                if (shoppingCart[i].id == movieId) {
                    amount = shoppingCart[i].amount;
                    break;
                }
            }
            var cartInnerNameAmount = $("<div>").text(movie.name + " x " + amount).addClass("cartDropDownDiv col-md-10");
            var delBtn = $("<span>").addClass("glyphicon glyphicon-trash delBtnSHoppDrop col-md-1").attr("id", movieId);

            cartInnerNameAmount.appendTo(cartInnerDiv);
            delBtn.appendTo(cartInnerDiv);
            // checkoutBtn.appendTo(cartInnerDiv);

            $("#shoppingCartDropdown").append(cartInnerDiv);
        });

    }

    /**
     * Funktion för att visa det totala antalet filmer som ligger i kundkorgern.
     * Alla filmers amount läggs på var sitt index i en lista som sedan adderas
     * för att sen visas som en siffra på kundkorgen.
     */
    function getAmountOfItems() {
        var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
        var noOfItems = [];
        for (var i = 0; i < shoppingCart.length; i++) {
            noOfItems.push(shoppingCart[i].amount);
        }

        //reduce adderar alla siffor i en lista
        var sum = noOfItems.reduce(function (a, b) {
            return a + b;
        }, 0);


        //Sätter sum som datacount och sum innehåller det totala antalet filmer i kundkorgen
        $("#noIfItemsBadge").attr("data-count", sum).addClass("badge");
    }


}); //Document ready end




