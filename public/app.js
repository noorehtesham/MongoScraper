
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
  
    
        if (data.note) {
       
          $("#titleinput").val(data.note.title);
        
          $("#bodyinput").val(data.note.body);
        }
      });
  });

  // $(document).on("click", "#savenote", function() {

  //   var thisId = $(this).attr("data-id");

  //   $.ajax({
  //     method: "POST",
  //     url: "/articles/" + thisId,
  //     data: {
        
  //       title: $("#titleinput").val(),
     
  //       body: $("#bodyinput").val()
  //     }
  //   })
   
  //     .then(function(data) {
     
  //       console.log(data);
       
  //       $("#notesArea").empty();
  //     });
  

  //   $("#titleinput").val("");
  //   $("#bodyinput").val("");
  // });
  