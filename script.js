$(document).ready(function () {
    // this is creating a search for heroes button that will display a text box to enter hero name when clicked
    let nameSearchButton = $("<button>");
    nameSearchButton.attr("id", "nameSearchBtn");
    nameSearchButton.text("Search for Supers By Name");
    $("#searchButtons").append(nameSearchButton);
    $("#nameSearchBtn").on("click", searchSuperByName);

    // this is creating the search for heroes button that will display letter buttons when clicked 
    let alphaSearchButton = $("<button>");
    alphaSearchButton.attr("id", "alphaSearchBtn");
    alphaSearchButton.text("Search for Supers Alphabetically");
    $("#searchButtons").append(alphaSearchButton);
    $("#alphaSearchBtn").on("click", getHeroesAlphabet);

    // this is creatin the search for heroes button that will display a text box to enter comic when clicked
    let comicSearchButton = $("<button>");
    comicSearchButton.attr("id", "comicSearchBtn");
    comicSearchButton.text("Search for Supers By Comic");
    $("#searchButtons").append(comicSearchButton);
    $("#comicSearchBtn").on("click", searchSuperByComic);

    // this is creating the search box and button and triggers the function heroSearch when button is clicked
    function searchSuperByName() {
        $("#heroPics").empty();
        $("#searchBar").empty();
        $("#letterComicButtons").empty();
        let searchBar = $("<input>");
        searchBar.attr("type", "text");
        searchBar.attr("placeholder", "Super's Name");
        searchBar.attr("id", "heroNameHere");
        let searchBarBtn = $("<button>");
        searchBarBtn.text("Search");
        searchBarBtn.attr("id", "searchBarBtn")
        $("#searchBar").append(searchBar);
        $("#searchBar").append(searchBarBtn);
        $("#searchBarBtn").on("click", heroSearch);
    }

    // this function is taking whatever was entered into search bar and grapping the hero that matches that name and displaying it
    function heroSearch() {
        $("#letterComicButtons").empty();
        $("#heroPics").empty();
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
            heroPicImg.attr("data-name", heroName);
            $("#heroPics").prepend(heroPicImg);
        })
    }

    // this is creating the search box and button and triggers the function comicSearch when button is clicked
    function searchSuperByComic() {
        $("#heroPics").empty();
        $("#searchBar").empty();
        $("#letterComicButtons").empty();
        let searchBar = $("<input>");
        searchBar.attr("type", "text");
        searchBar.attr("placeholder", "Comic's Name");
        searchBar.attr("id", "comicNameHere");
        let searchBarBtn = $("<button>");
        searchBarBtn.text("Search");
        searchBarBtn.attr("id", "searchBarBtn")
        $("#searchBar").append(searchBar);
        $("#searchBar").append(searchBarBtn);
        $("#searchBarBtn").on("click", comicSearch);
    }

    // this function creates buttons for each comic that was returned from comic search that has characters in it
    function comicSearch() {
        let comicNameSearch = $("#comicNameHere").val();
        let queryURL = "https://gateway.marvel.com/v1/public/comics?title=" + comicNameSearch + "&limit=20&ts=1&apikey=041b36ff0606f85c2d365e1174d26db6&hash=88a95a7cb326797147690494db18ecdb";
        let comics = [];
        $("#letterComicButtons").empty();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (let i = 0; i < response.data.results.length; i++) {
                comics.push(response.data.results[i].title);
            }
            for (let i = 0; i < comics.length; i++) {
                if (response.data.results[i].characters.available !== 0) {
                    let comicButton = $("<button>");
                    comicButton.text(comics[i]);
                    comicButton.addClass("comicBtn");
                    comicButton.attr("data-comicId", response.data.results[i].id);
                    $("#letterComicButtons").append(comicButton);
                }
            }
        })
    }

    // this function is running an ajax call in a for loop to display heroes alphabetically
    function getHeroesAlphabet() {
        $("#heroPics").empty();
        $("#searchBar").empty();
        $("#letterComicButtons").empty();
        let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        for (let i = 0; i < alphabet.length; i++) {
            let letterButton = $("<button>");
            letterButton.text(alphabet[i]);
            letterButton.addClass("letterBtn");
            letterButton.attr("data-letter", alphabet[i]);
            $("#letterComicButtons").append(letterButton);
        }
    }
    
    // this event listener is triggered when you click a comic and displays the characters in that comic
    $(document).on("click", ".comicBtn", function (event) {
        $("#heroPics").empty();
        let comicVal = $(this).attr("data-comicId")
        let queryURL = "https://gateway.marvel.com:443/v1/public/comics/" + comicVal + "/characters?ts=1&apikey=041b36ff0606f85c2d365e1174d26db6&hash=88a95a7cb326797147690494db18ecdb";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            let comicLabel = $("<div>")
            comicLabel.attr("style","color: red")
            comicLabel.text("Supers In Comic ID " + comicVal + ":");
            $("#heroPics").append(comicLabel);
            for (let i = 0; i < 100; i++) {
                let heroExtension = response.data.results[i].thumbnail.extension;
                let heroPic = response.data.results[i].thumbnail.path + "/portrait_xlarge." + heroExtension;
                let heroName = response.data.results[i].name;
                if (heroPic.search("image_not_available") === -1 && heroName != "" && heroExtension === "jpg") {
                    let heroPicImg = $("<img>");
                    heroPicImg.addClass("heroPics");
                    heroPicImg.attr("src", heroPic);
                    heroPicImg.attr("data-name", heroName);
                    $("#heroPics").append(heroPicImg);
                }
            }
        })
    })

    // this event listener triggers an ajax call that will search for heroes that start with the letter of the button clicked
    $(document).on("click", ".letterBtn", function (event) {
        $("#heroPics").empty();
        let heroLetter = $(this).attr("data-letter");
        let queryURL = "https://gateway.marvel.com/v1/public/characters?nameStartsWith=" + heroLetter + "&limit=100&ts=1&apikey=041b36ff0606f85c2d365e1174d26db6&hash=88a95a7cb326797147690494db18ecdb";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            let alphaLabel = $("<div>");
            alphaLabel.attr("style","color:red");
            alphaLabel.text("Supers Whose Name Starts With " + event.currentTarget.attributes[1].value + " :");
            $("#heroPics").append(alphaLabel);
            for (let i = 0; i < 100; i++) {
                let heroExtension = response.data.results[i].thumbnail.extension;
                let heroPic = response.data.results[i].thumbnail.path + "/portrait_xlarge." + heroExtension;
                let heroName = response.data.results[i].name;
                if (heroPic.search("image_not_available") === -1 && heroName != "" && heroExtension === "jpg") {
                    let heroPicImg = $("<img>");
                    heroPicImg.addClass("heroPics");
                    heroPicImg.attr("src", heroPic);
                    heroPicImg.attr("data-name", heroName);
                    $("#heroPics").append(heroPicImg);
                }
            }
        })
    });

    // this event listener will alert you the name of any hero clicked
    $(document).on("click", ".heroPics", toggleModal); 
       
    let modal = document.querySelector(".modal");
    let closeButton = document.querySelector(".close-button");
    
    function toggleModal() {
        modal.classList.toggle("show-modal");
    }
    
    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        }
    }
    
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);
});

