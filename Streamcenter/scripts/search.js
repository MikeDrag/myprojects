// Funktion för att produkterna ska inte laddas för snabbt.

var delay = (function (){  
    var timer = 0;
    return function (callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();
// Här skriver användaren och valet sparas.
$(document).ready(function(){
    $('#list').html('');
    $('#searchValue').keyup(function(){
        var searchField = $('#searchValue').val();
        delay(function(){
            if (searchField === "" ){
                $("#list").html("Skriv för att söka");
                $("#list").fadeOut("slow");
            }
// Hämtar produkterna och valet och visar allt på en lista.
            else {
                var movieAPI = $.getJSON('http://medieinstitutet-wie-products.azurewebsites.net/api/search?searchText=' + searchField,
                    function(data) {
                        $.each(data, function(key, value){
                            if (value.name.search() != -1)
                            {
                                $('#list')
                                    .append(
                                        '<a href="info.html?productId=' + value.id + '">' +
                                        '<li class="list-group-item link-class">' +
                                        '<img src="'+ value.imageUrl+'" height="40" width="30" class="img-thumbnail" /> ' +
                                        ''+value.name+' | <span class="text-muted">'+value.year+'</span></li></a>');
                            }
                             $("body").on("click", function(){
                                 $('#list').html('');
                                document.getElementById("searchValue").value = "";

                             });

                        });

                    });
            }

        }, 200);
 // Tömmer listan
        $('#list').html(''); 


    });

});