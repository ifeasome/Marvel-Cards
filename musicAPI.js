//import {script} from './script.js'

//making the call to deezer 
let musicBtn=$("#musicBtn");
let searchTerm="hulk";

musicBtn.on("click", function() {
let queryURL="https://cors-anywhere.herokuapp.com/"+"https://api.deezer.com/search/track?q="+searchTerm
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      console.log(musicBtn+"I am music search");
      
    });

});