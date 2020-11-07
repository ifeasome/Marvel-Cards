//making the call to deezer 
//received an error 

let musicBtn=$("#musicBtn");
let searchTerm="superhero";

musicBtn.on("click", function() {
let queryURL="https://api.deezer.com/search/track?q="+searchTerm
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      
    });

})

//adding animation to the card

//do some animation 