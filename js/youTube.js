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

        name = name.split(' ').join('')

        var img = response.items[0].snippet.thumbnails.medium.url
        var vidId = response.items[0].id.videoId

        // $("#return").append(`<div><img src="${img.url}"></div>`)
        $(`#${name}Card`).css("background-image", "url(" + img + ")");
        $(`#yt${name}`).append(`<iframe id="ytplayer" type="text/html" width="250" height="100" style="margin-right: 100px;"
        src="https://www.youtube.com/embed/${vidId}" frameborder="0"></iframe>`)
        })
                
            }
        // $("#submit").on("click", songSearch)


        