$(document).ready(function () {
    // this is creating the search button that will sit next to the search bar (submit button) and triggers the function heroSearch when clicked
   let searchBarBtn = $("<button>");
   searchBarBtn.text("Search");
   searchBarBtn.attr("id","searchBarBtn")
    $("#searchBar").append(searchBarBtn);
    $("#searchBarBtn").on("click",heroSearch);

    // this is creating the search for heroes button that will call the function getHeroes when clicked
    let searchForHeroesButton = $("<button>");
    searchForHeroesButton.attr("id","searchBtn");
    searchForHeroesButton.text("Search for Heroes");
    $("#searchButton").append(searchForHeroesButton);
    $("#searchBtn").on("click",getHeroes);

    // this function is getting a list of 100 heroes and display them if they have a valid picture and a name 
    function getHeroes() {
        let queryURL = "http://gateway.marvel.com/v1/public/characters?limit=100&ts=1&apikey=041b36ff0606f85c2d365e1174d26db6&hash=88a95a7cb326797147690494db18ecdb";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            for (let i = 0; i < 100; i++) {
                let heroExtension = response.data.results[i].thumbnail.extension
                let heroPic = response.data.results[i].thumbnail.path + "/portrait_xlarge." + heroExtension;
                let heroName = response.data.results[i].name
                if(heroPic.search("image_not_available")=== -1 && heroName != "" && heroExtension === "jpg"){
                    let heroPicImg = $("<img>");
                    heroPicImg.addClass("heroPics");
                    heroPicImg.attr("src",heroPic);
                    heroPicImg.attr("data-name", heroName)
                    $("#heroPics").append(heroPicImg);
                }
            }
        })
    }
    // this function is taking whatever was entered into search bar and grapping the hero that matches that name and displaying it
    function heroSearch(){
        let heroNameSearch = $("#heroNameHere").val();
        let queryURL = "http://gateway.marvel.com/v1/public/characters?name=" + heroNameSearch + "&ts=1&apikey=041b36ff0606f85c2d365e1174d26db6&hash=88a95a7cb326797147690494db18ecdb";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            let heroExtension = response.data.results[0].thumbnail.extension;
            let heroPic = response.data.results[0].thumbnail.path + "/portrait_xlarge." + heroExtension;
            let heroName = response.data.results[0].name;
            let heroPicImg = $("<img>");
            heroPicImg.addClass("heroPics");
            heroPicImg.attr("src",heroPic);
            heroPicImg.attr("data-name", heroName)
            $("#heroPics").prepend(heroPicImg);
        })
    }
    // this event listener will alert you the name of any hero clicked
    $(document).on("click", ".heroPics", function(){
        let heroName = $(this).attr("data-name");
        alert (heroName);
    }); 
});

