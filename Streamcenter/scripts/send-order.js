$(document).ready(function () {

    var companyId = 42;
    var sendOrderURL = "https://medieinstitutet-wie-products.azurewebsites.net/api/orders";
    var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

    if (shoppingCart.length == 0) {
        localStorage.clear();
    }

    $("#btnConfirmCheckout").on("click", function () {
        var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

        console.log("btnConfirmCheckout pressed ");
        //  console.log(shoppingCart.length);


        if (shoppingCart != null || shoppingCart.length != 0) {
            console.log("Nu sparar vi!!!");

            $.ajax({
                url: sendOrderURL,
                data: JSON.stringify(getOrders()),
                method: "POST",
                contentType: "application/json; charset=utf-8",
                headers: {
                    accept: "application/json"
                },
                success: function (data) {
                    console.log("Nu är det sparat?");
                    console.log(data);

                  //Här ska modalen visas och LS tömmas
                    localStorage.removeItem("shoppingCart");
                    localStorage.removeItem("totalPrice");
                    $("#myModal").modal("show");


                },
                error: function (error) {
                    console.log("Nu blev det fel!");
                    console.log(error);
                }
            }); //ajax end
        } //if end
    });
 // Hämta orderna
    function getOrders() {
        var orderFromLS = JSON.parse(localStorage.getItem("shoppingCart"));
        var totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
        if (orderFromLS != null) {

            var userEmail = $("#emailFromUser").val();
            console.log(userEmail);
            var order = {
                CompanyId: companyId,
                CreatedBy: userEmail,
                Created: getDateTime(),
                TotalPrice: totalPrice,
                OrderRows: []
            };

            for (var i = 0; i < orderFromLS.length; i++) {
                order.OrderRows.push(
                    {
                        ProductId: orderFromLS[i].id,
                        Amount: orderFromLS[i].amount
                    });
            }
            return order;
        }

    }
        // Visar tiden
    function getDateTime() {
        var dateTime = new Date();
        dateTime.setHours(dateTime.getHours() + 1);
        return dateTime;
    }


    $("#btnCancelCheckout").on("click", function () {

        //alert("Nu ska man skickas tillbaka till kundkorgen");
        window.location = "../html/index.html"

    });

    $("#closeModalAndRedirect").on("click", function () {
        window.location = "../html/index.html"

    });



    //Email validation
    $('form input[name="email"]').change(function () {
        var email = $(this).val();
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;

        var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

        console.log(shoppingCart);
        if (re.test(email) && (shoppingCart != null && shoppingCart.length != 0)) {
            console.log("valid mail");


            $("#btnConfirmCheckout").prop("disabled", false);


        } else {
            $("#btnConfirmCheckout").prop("disabled", true);
            console.log("EJ valid mail");
        }
    });


});