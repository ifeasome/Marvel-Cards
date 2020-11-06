$(document).ready(function () {

    // this is creating the search button that will sit next to the search bar (submit button) and triggers the function heroSearch when clicked
    let searchBarBtn = $("<button>");
    searchBarBtn.text("Search");
    searchBarBtn.attr("id", "searchBarBtn")
    $("#searchBar").append(searchBarBtn);
    $("#searchBarBtn").on("click", heroSearch);

    // this is creating the search for heroes button that will call the function getHeroes when clicked
    let alphaSearchButton = $("<button>");
    alphaSearchButton.attr("id", "searchBtn");
    alphaSearchButton.text("Search for Heroes Alphabetically");
    $("#searchButton").append(alphaSearchButton);
    $("#searchBtn").on("click", getHeroesAlphabet);

    // this function is taking whatever was entered into search bar and grapping the hero that matches that name and displaying it
    function heroSearch() {
        let heroNameSearch = $("#heroNameHere").val();
        let queryURL = "https://gateway.marvel.com/v1/public/characters?name=" + heroNameSearch + "&ts=1&apikey=041b36ff0606f85c2d365e1174d26db6&hash=88a95a7cb326797147690494db18ecdb";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            let heroExtension = response.data.results[0].thumbnail.extension;
            let heroPic = response.data.results[0].thumbnail.path + "/portrait_xlarge." + heroExtension;
            let heroName = response.data.results[0].name;
            let heroPicImg = $("<img>");
            heroPicImg.addClass("heroPics");
            heroPicImg.attr("src", heroPic);
            heroPicImg.attr("data-name", heroName)
            $("#heroPics").prepend(heroPicImg);
        })
    }
    
    // this function is running an ajax call in a for loop to display heroes alphabetically
    function getHeroesAlphabet() {
        let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        for (let i = 0; i < alphabet.length; i++) {
            let queryURL = "https://gateway.marvel.com/v1/public/characters?nameStartsWith=" + alphabet[i] + "&limit=50&ts=1&apikey=041b36ff0606f85c2d365e1174d26db6&hash=88a95a7cb326797147690494db18ecdb";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                let alphaLabel = $("<h2>")
                alphaLabel.text("Heroes Whose Name Starts With " + alphabet[i].toUpperCase() + " :");
                $("#heroPics").append(alphaLabel);
                for (let i = 0; i < 50; i++) {
                    let heroExtension = response.data.results[i].thumbnail.extension
                    let heroPic = response.data.results[i].thumbnail.path + "/portrait_xlarge." + heroExtension;
                    let heroName = response.data.results[i].name
                    if (heroPic.search("image_not_available") === -1 && heroName != "" && heroExtension === "jpg") {
                        let heroPicImg = $("<img>");
                        heroPicImg.addClass("heroPics");
                        heroPicImg.attr("src", heroPic);
                        heroPicImg.attr("data-name", heroName);
                        $("#heroPics").append(heroPicImg);
                    }
                }
            })
        }
    }
    // this event listener will alert you the name of any hero clicked
    $(document).on("click", ".heroPics", function () {
        let heroName = $(this).attr("data-name");
        alert(heroName);
    });
});

