// this event listener will alert you the name of any hero clicked
let musicBtn=$("#musicBtn");//this could be moved the to the button on the card, when the card flips over 
musicBtn.on("click", ".heroPics", function () {
    let heroName = $(this).attr("data-name");//this used to work prior to the toggel 
    //this API Calls Deezer using the heroName to generate a song associated with the character selected
let searchTerm=heroName;
let musicURL="https://cors-anywhere.herokuapp.com/"+"https://api.deezer.com/search/track?q="+searchTerm
$.ajax({
    url: musicURL,
    method: "GET"
    }).then(function(response) {
        let song=response.data[0].id;
        let playerURL="https://www.deezer.com/plugins/player?format=square&autoplay=true&playlist=true&width=300&height=300&color=EF5466&layout=&size=medium&type=tracks&id="+
        song+'&app_id=444442';
        let deezerPlayer=$("#player");
        deezerPlayer.attr("src", playerURL);
                
        })
    })
