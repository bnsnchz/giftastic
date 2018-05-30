
var topic = ["super smash brothers melee", "pubg", "overwatch","goldeneye"];

function displayGif() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topic + "&api_key=dc6zaTOxFJmzC&limit=10";
    
    $("#gifs-here").empty();
 

  $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var results = response.data;


        

         for (var i = 0; i < results.length; i++) {
            
            var topicDiv = $("<div class='gifs'>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var topicImage = $("<img>");

            topicImage.addClass("gif");

            topicImage.attr("src", results[i].images.fixed_height_small_still.url);

            topicImage.attr("data-still", results[i].images.fixed_height_small_still.url);
            
            topicImage.attr("data-animate", results[i].images.fixed_height_small.url);

            topicImage.attr("data-state", "still");

            topicImage.attr("data-state", "animate");
           
            topicDiv.append(topicImage);

            topicDiv.append(p);

            $("#gifs-here").prepend(topicDiv);
            }
            
            $(".gif").on("click", function() {
              var state = $(this).attr("data-state");
              if (state === "still") {
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
              } 
            
            })

    })
}




function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < topic.length; i++) {
      var a = $("<button>");
      a.addClass("topic-btn btn btn-primary");
      a.attr("data-name", topic[i]);
      a.text(topic[i]);
      $("#buttons-view").append(a);
    }
  }

  $("#add-topic").on("click", function(event) {
    event.preventDefault();
    var newTopic = $("#topic-input").val().trim();
    
    topic.push(newTopic);

    renderButtons();
  });

  $(document).on("click", ".topic-btn", displayGif);

  renderButtons();



