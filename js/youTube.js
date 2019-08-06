var name;

var queryURL;


function youtubeCall() {

    // event.preventDefault()


    name = $("#search").val().trim()


    queryURL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAOTZGphDucwnM6ekFwYXpRPsDwrUCatRY&part=id,snippet&q=' + name

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)


        var img = response.items[0].snippet.thumbnails.medium
        var vidId = response.items[0].id.videoId
        console.log('img: ', img)

        // $("#return").append(`<div><img src="${img.url}"></div>`)
        $('#resultCard').css("background-image", "url("+img.url+")");
        $("#youTubeVid").append(`<iframe id="ytplayer" type="text/html" width="450" height="100"
        src="https://www.youtube.com/embed/${vidId}" frameborder="0"></iframe>`)
        })
                
            }
        // $("#submit").on("click", songSearch)


        