
// code to take the user input and query the databases for the song lyrics

// create variables to hold values we will use in our functions

var name;

// a proxy allows us to deal with cross-origin limitations
var proxy = 'https://cors-anywhere.herokuapp.com/'

var queryURL;

// the function to trigger ajax querys into databases for the information 
function songSearch() {

    // grabbing the title of the song through our search input value
    name = $("#search").val().trim()

    queryURL = 'http://ws.audioscrobbler.com/2.0/?method=track.search&track='
    + name + '&api_key=39a411e939e5e26509aa56b72185ed54&format=json&limit=1'

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        var results = response.results

        // takes the song name and puts it in a new variable
        var songName = results.trackmatches.track[0].name
        // takes the artist of the song and puts it in a new variable
        var songArtist = results.trackmatches.track[0].songArtist

        // using the information created above we now run another call into a lyric database
        function lyricGet() {

            queryUrl = 'https://api.audd.io/findLyrics/?q='
            + songName + " " + songArtist

            $.ajax({
                url: (proxy + queryURL),
                method: "GET"
            }).then(function(response){

                // figure out where we are displaying the lyrics and how

                console.log(response.result[0].lyrics) // the lyrics for the song

            })
        } 
        lyricGet();
    })

    //$("#search").val().empty();
}

// listener to run the song search function when the submit button is clicked
$(document).on("click", "#search", songSearch())

