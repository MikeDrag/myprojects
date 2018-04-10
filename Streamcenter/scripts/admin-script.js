$(document).ready(function () {
    
        var getOrders = "https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=42";
    // Hämtar orderna och visar dom på skärmen i en tabell.
        $.getJSON(getOrders, function showInfo(result) {
            console.log(result);
    
            // var result = _.sortBy(result, "createdBy");
    
            for (var i = 0; i < result.length; i++) {
                var newOrderRow = $("<tr>")
                    .addClass("showOrders")
                    .appendTo($("tbody"));
    
                $("<td>")
                    .addClass("orderId")
                    .html(result[i].id)
                    .appendTo(newOrderRow);
    
                var foo = $("<td>").appendTo(newOrderRow);
                var bar = $("<td>").appendTo(newOrderRow);
                var productNameUl = $("<ul>").appendTo(foo); //ul
                var amountUl = $("<ul>").appendTo(bar); //ul
                var am = 0;
    
                // Loopar och visar allt på sidan
                for (var j = 0; j < result[i].orderRows.length; j++) {
    
    
                    getNameOfMovie(result[i].orderRows[j].productId);
    
                    $("<li>") //namn på filmerna LI
                        .addClass("listStyle")
                        .html(mName)
                        .appendTo(productNameUl); //productNameUl
    
    
                    $("<li>") //antal filmer LI
                        .addClass("listStyle")
                        .html(result[i].orderRows[j].amount)
                        .appendTo($(amountUl)); //amountUl
                    am = am + result[i].orderRows[j].amount;
                    console.log(am);
    
    
                } //end for loop
    
                $("<td>")
                    .text(am)
                    .appendTo($(newOrderRow));
    
    
                $("<td>") //
                    .addClass("totalPrise")
                    .html(result[i].totalPrice + " SEK")
                    .appendTo($(newOrderRow));
    
                $("<td>")
                    .addClass("orderCreate")
                    .html(getTimeFormated(result[i].created))
                    .appendTo(newOrderRow);
    
                $("<td>")
                    .addClass("orderMail")
                    .html(result[i].createdBy)
                    .appendTo(newOrderRow);
    
                var tdInput = $("<td>").addClass("delBtnStyle").appendTo(newOrderRow);
    
                $("<input>")
                    .attr("id", result[i].id)
                    .attr("type", "submit")
                    .attr("value", "Delete")
                    .addClass("btn btn-danger deleteAdminBtn")
                    .appendTo(tdInput);
    
    
                // Funktion som körs när användaren trycker på deleteknappen
                $(".deleteAdminBtn").off("click").on("click", function () {
    
                    var id = $(this).attr("id");
    
                    if (confirm("Remove the current order?") == true) {
    
                        var sendOrderURL = "https://medieinstitutet-wie-products.azurewebsites.net/api/orders/";
    
                        $.ajax({
                            url: sendOrderURL + id,
                            method: "DELETE",
                            contentType: "application/json; charset=utf-8",
                            headers: {
                                accept: "application/json"
                            },
                            success: function (data) {
                                $(this).hide(id);
                                console.log("Raderat???");
    
                            },
                            error: function (error) {
                                console.log("Nu blev det fel!");
                            }
                        }); //ajax end
                    } // if end
                }); //delete btn end
            } //for I end
    
    // implementerar dataTable för att visa all info på table snyggt.
            $('#myTable').dataTable({
                "aoColumns": [
                    {"bSearchable": false},
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                ]
            });
    
        }); //getJson end
    
        var mName;
    
    // Funktion för att hämta filmens namn via filmens produktid
        function getNameOfMovie(productId) {
            console.log("hej");
            var productsURL = "https://medieinstitutet-wie-products.azurewebsites.net/api/products/" + productId;
    
            $.ajax({
                url: productsURL,
                method: "GET",
                async: false,
                dataType: "json",
                success: function (data) {
                    mName = data.name;
    
                }
            });
        }
    
        // FUnktion för att formatera det sparade datumet till ett mer lättläst och överskådeligt format.
        function getTimeFormated(dateData) {
            return moment(dateData).format("MMMM Do YYYY, HH:mm:ss");
        }
    });