// code to take the user input and query the databases for the song lyrics

// create variables to hold values we will use in our functions

var name;

// a proxy allows us to deal with cross-origin limitations
var proxy = 'https://cors-anywhere.herokuapp.com/'

var queryURL;

// the function to trigger ajax querys into databases for the information 
function songSearch(event) {

    event.preventDefault()

    // grabbing the title of the song through our search input value
    name = $("#search").val().trim()
    name2 = name.split(' ').join('')

    queryURL = 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=' +
        name + '&api_key=39a411e939e5e26509aa56b72185ed54&format=json&limit=1'

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.results
        console.log(results)
        // takes the song name and puts it in a new variable
        var songName = results.trackmatches.track[0].name
        // takes the artist of the song and puts it in a new variable
        var songArtist = results.trackmatches.track[0].artist

        // using the information created above we now run another call into a lyric database
        function lyricGet() {

            queryURL = 'https://audd.p.rapidapi.com/findLyrics?q=' +
                songName + " " + songArtist
            console.log(queryURL)
            $.ajax({
                url: (proxy + queryURL),
                method: "GET",
                headers: {
                    "X-RapidAPI-Host": "audd.p.rapidapi.com",
                    "X-RapidAPI-Key": "110cfbb460msh761fb82b235ed59p1896bejsnfe1563698842"
                }
            }).then(function (response) {

                console.log(response)
                // figure out where we are displaying the lyrics and how
                var lyricId = songName.split(' ').join('');
                //  console.log(response.result[0].lyrics) // the lyrics for the song

                $("#return").append(`<div class="card bg-light mb-3" id="${name2}Card" style="width: 394px;height:230px;">
                <h5 class="card-header">${songArtist}</h5>
                <div class="card-title">${songName}</div>
                
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#${lyricId}" style="margin-left:10px;margin-top:90px;">
                Lyrics
                </button>
                <div class="modal fade" id="${lyricId}" tabindex="-1" role="dialog" aria-labelledby="lyricsLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                             <h5 class="modal-title" class="songName">${songName}</h5><br>
                             <h6 class="modal-title" class="songArtist">${songArtist}</h6>
                             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                             </button>
                            </div>
                             <div class="modal-body">
                              <p>
                              ${response.result[0].lyrics}
                              </p>
                             </div>
                             
                             
                             
                            <div class="modal-footer">
                                <div id="yt${name2}"></div>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                         </div>
                    </div>
                </div>
        </div>`)
                youtubeCall()
            })
        }
        lyricGet();
    })

    //$("#search").val("");
}

// listener to run the song search function when the submit button is clicked
$("#submit").on("click", songSearch)