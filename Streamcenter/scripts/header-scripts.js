$(document).ready(function () {


    var categoryURL = "https://medieinstitutet-wie-products.azurewebsites.net/api/categories";
 // Hämtar filmer från kategorisidan och pushar dom på skärmen, sen kan användaren välja.
    $.getJSON(categoryURL, function (result) {
        var listOfCategories = [];
        for (var i = 0; i < result.length; i++) {

            listOfCategories.push(result[i].name);
        }

        document.getElementById("categorySelectList").innerHTML = populateCategoriesList(result);

        $("#selectListForCategories").on("change", function () {
            console.log("hej hej");

            var val = $(this).val();
            console.log("val " + val);

            window.location = "kategori.html?id=" + val;

        });
    });

    //  Droplistan med kategorier
    function populateCategoriesList(result) {

        var nonSelectable = "<option selected disabled>Choose Category</option>";
        var selectAll = "<option value='all'>Show all movies</option>";
        var options = "";
        for (var i = 0; i < result.length; i++) {

            options += "<option value= '" + result[i].id + "'>" + result[i].name + "</option>";
        }
        return "<select class='setListWidth navbar-form navbar-left form-control' id='selectListForCategories'>" + nonSelectable + selectAll + options + "</select>";


    }
});
