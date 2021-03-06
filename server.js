var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

var dbArticle = require("./models/article");

var PORT = process.env.PORT || 3000

var app = express();
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.Promise = Promise;

mongoose.connect(MONGODB_URI);

app.get("/api/scrape", function (req, res) {
  axios.get("https://www.nytimes.com/section/technology").then(function (response) {
    var $ = cheerio.load(response.data);

    $("article h2 ").each(function (i, element) {
      var result = {};

      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      dbArticle.create(result)
        .then(function (dbArticle) {
          console.log(dbArticle);
        })
        .catch(function (err) {
          return res.json(err);
        });

    });

    res.send("Scrape Complete");
  })

})
app.post("/articles/:id", function (req, res) {

  db.Note.create(req.body)
    .then(function (dbNote) {

      return db.Article.findOneAndUpdate({
        _id: req.params.id
      }, {
        note: dbNote._id
      }, {
        new: true
      });
    })
    .then(function (dbArticle) {

      res.json(dbArticle);
    })
    .catch(function (err) {

      res.json(err);
    });
})



app.get("/articles/:id", function (req, res) {
  db.Article.findOne({
      _id: req.params.id
    })
    .populate("note")
    .then(function (dbArticle) {
      res.json(dbArticle);


    })
    .catch(function (err) {
      res.json(err);
    });

});

app.get("/api/articles", function (req, res) {
  console.log(req);
  dbArticle.find({})
    .then(function (dbArticle) {

      res.json(dbArticle);
    })
    .catch(function (err) {

      res.json(err);
    });
});

app.post("/api/articles/:id", function (req, res) {
  // TO DO: here you will see that the id is being passed from index.js into here.
  // Now you will need to store the info in mongo
  // I think you may also need to store more information than just the id and the saved = true
  // potentially the URL, etc.
  
  console.log(req.params.id, "id");
  console.log(req.body, "body")
  // dbArticle.find({})
  //   .then(function (dbArticle) {

  //     res.json(dbArticle);
  //   })
  //   .catch(function (err) {

  //     res.json(err);
  //   });
});

app.get("/notes", function (req, res) {

  dbNote.find({})
    .then(function (dbNote) {

      res.json(dbNote);
    })
    .catch(function (err) {

      res.json(err);
    });
});




app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});