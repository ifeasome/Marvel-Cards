$(document).ready(function () {
    let modal = document.querySelector(".modal");
    let nameSource = "";
    let picSource = "";
    let cardStyle = "";
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
            heroPicImg.attr("data-imgSrc", heroPic);
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

    // this either opens or closes the modal and adds info to modal
    function toggleModal() {
        $("#modalInfo").empty();
        modal.classList.toggle("show-modal");
        nameSource = $(this).attr("data-name");
        picSource = $(this).attr("data-imgSrc");
        let heroName = $("<div>");
        heroName.addClass("modalName");
        let heroPic = $("<img>");
        heroPic.addClass("modalPic");
        heroName.text(nameSource);
        heroPic.attr("src", picSource);
        $("#modalInfo").append(heroPic, heroName);
        musicCall(nameSource);
    }

    //this function makes a call to deezer api to pull bring back a song
    function musicCall(nameSource) {
        let queryURL = "https://cors-anywhere.herokuapp.com/" + "https://api.deezer.com/search/track?q=" + nameSource;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            let song = response.data[0].id;
            let playerURL = "https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=false&width=400&height=10&color=EF5466&layout=dark&size=medium&type=tracks&id=" +
                song + "&app_id=444442";

            let deezerPlayer = $("#player");
            deezerPlayer.attr("src", playerURL);
        });
    }

    // if outside of the modal is clicked while modal is up close the modal
    function windowOnClick(event) {
        if (event.target === modal) {
            modal.classList.toggle("show-modal");
            $("#player").attr("src","");
        }
    }

    // makes an object called card this is then sent to local storage and then closes modal
    function storeCard() {
        $("#player").attr("src", "")
        let card = {
            name: nameSource,
            pic: picSource,
            style: cardStyle
        }
        // setting cards made to locaStorage
        let superCards = card.name;
        localStorage.setItem(superCards, JSON.stringify(card));
        cardMaker();
        modal.classList.toggle("show-modal");
 //incomplete function for displaying super hero cards
        function cardMaker() {
            let cards = localStorage.getItem(superCards);
            // the object should contain the hero name and the card style and the image source
            if (cards != null) {
                $("this is a div in html").empty();
                for (let i = 0; i < cards.length; i++) {
                    let cardEl = $("<div>");
                    cardEl.css("display", "inline-block");
                    // cards[i].style should be a url of the background image 
                    let cardStyle = cards[i].style;
                    cardEl.css("background-image", "url(" + cardStyle + ")");
                    let cardPic = $("<img>");
                    // cards[i].source should be the heroPic URL
                    cardPic.attr("src", cards[i].pic);
                    let cardName = $("<h5>");
                    //cards[i].name should be the name of the hero
                    cardName.text(cards[i].name);
                    cardName.css("color", "white");
                    cardEl.append(cardPic, cardName);
                    $("#this is a div in html").append(cardEl);
                }
            }
            else {
                return;
            }
        }
        cardMaker();
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
            comicLabel.attr("style", "color: red")
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
                    heroPicImg.attr("data-imgSrc", heroPic);
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
            alphaLabel.attr("style", "color:red");
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
                    heroPicImg.attr("data-imgSrc", heroPic);
                    $("#heroPics").append(heroPicImg);
                }
            }
        })
    });

    // this event listener will alert you the name of any hero clicked
    $(document).on("click", ".heroPics", toggleModal);

    // changing the value of cardStyle based on which radio button is selected in the modal
    $("input[type='radio']").on("change", function () {
        let radioVal = $("input[name='optionsRadios']:checked").val()
        if (radioVal === "Galaxy Card") {
            cardStyle = "https://images.pexels.com/photos/1257860/pexels-photo-1257860.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
            return cardStyle;
        }
        else if (radioVal === "Wood Card") {
            cardStyle = "https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
            return cardStyle;
        }
        else {
            cardStyle = "https://images.pexels.com/photos/539447/pexels-photo-539447.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            return cardStyle;
        }
    });

    $("#save-card").on("click", storeCard);

    $("#back-button").on("click", function () {
        modal.classList.toggle("show-modal");
        $("#player").attr("src", "");
    });

    window.addEventListener("click", windowOnClick);
});