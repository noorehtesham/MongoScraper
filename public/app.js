
$.getJSON("/articles", function(data) {

    for (var i = 0; i < data.length; i++) {
   
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });
  
  

  $(document).on("click", "p", function() {
   
    $("#notesArea").empty();
   
    var thisId = $(this).attr("data-id");
  

    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      
      .then(function(data) {
        console.log(data);
    
        $("#notesArea").append("<h2>" + data.title + "</h2>");
       
        $("#notesArea").append("<input id='titleinput' name='title' >");
        
        $("#notesArea").append("<textarea id='bodyinput' name='body'></textarea>");
        
        $("#notesArea").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
       
          $("#titleinput").val(data.note.title);
        
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notesArea").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  