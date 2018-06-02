
$(document).ready(function () {

  var articles = $("#articles");

  initPage();



  function initPage() {

    articles.empty();
    $.get("/api/headlines?saved=false").then(function (data) {
s
      if (data && data.length) {
        renderArticles(data);
      } else {

        renderEmpty();
      }
    });
  }

  function renderArticles(data) {

    var articleCards = [];

    for (var i = 0; i < data.length; i++) {
      articleCards.push(createCard(data[i]));
    }

    articles.append(articleCards);
  }

  function createCard(article) {

    var card = $(
      [
        "<div class='card'>",
        "<div class='card-body'>",
        "<h4 class='card-title'>",
        "<a>" + article.title + "</a> <br>", 
        article.link,
        "<a class='btn btn-success btn-secondary save'>",
        "Save Article",
        "</a>",
        "</h3>",
        "</div>",
        "<div class='card-text'>",
        article.summary,
        "</div>",
        "</div>"
      ].join(" ")
    );

    card.data("_id", article._id);

    return card;
  }

  function renderEmpty() {

    var emptyAlert = $(
      [
        "<div class='alert alert-warning text-center'>",
        "<h4>No new articles.</h4>",
        "</div>",
        "<div class='card'>",
        "<div class='card-body' text-center'>",
        "<div class='card-title'>",
        "<h3>What Would You Like To Do?</h3>",
        "</div>",
        "<h4><a class='scrapeNew'>Scrape New Articles</a></h4>",
        "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
        "</div>",
        "</div>"
      ].join(" ")
    );

    articles.append(emptyAlert);
  }

  $(document).on("click", ".btn-success", function handleArticleSave() {

    var savedArticle = $(this).parents(".card").data();
    savedArticle.saved = true;
    console.log("saved");
    $.ajax({
      method: "PUT",
      url: "/api/articles",
      data: savedArticle
    }).then(function (data) {

      if (data.ok) {

        initPage();
      }
    })
  });

  $(document).on("click", "#savedArticles", function getSavedArticles() {
    $.get("/api/articles").then(function(data){
      renderArticles(data);

    })
  });

  $(document).on("click", "#scrapeNew", function handleArticleScrape() {
    console.log("hey im here");
    $.get("/api/scrape").then(function (data) {

      initPage();
      bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
    })
  })


});