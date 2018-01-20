$(document).ready(function() {

//////////////////////////////
// *** GLOBAL VARIABLES *** //
//////////////////////////////

var genreList = ["Action", "Animation", "Comedy", "Documentary", "Drama", "Family", "Horror", "Romance", "SciFi", "Thriller"]

var numWatchList = 0; // number of movies in "what to watch" list (right hand side)
var watchListArray = []; // array of movies to watch (right hand side)
var movieBank = []; // movies you've watched


/////////////////////////////////
// *** INITIALIZE FIREBASE *** //
/////////////////////////////////

 var config = {
   apiKey: "AIzaSyDKV0NiT6QZsec00Klgqn9LzYzlRWXS7s0",
   authDomain: "projectpopcorn-192318.firebaseapp.com",
   databaseURL: "https://projectpopcorn-192318.firebaseio.com",
   projectId: "projectpopcorn-192318",
   storageBucket: "projectpopcorn-192318.appspot.com",
   messagingSenderId: "722185974282"
 };

 firebase.initializeApp(config);

 // create reference to firebase
 var database = firebase.database();


/////////////////////////////////////
// *** MOVIES TO SHOW ON LOAD *** //
////////////////////////////////////

// ajax call to pull initial movie browse list which is "most popular movies"
  var themoviedbMostPopular = "https://api.themoviedb.org/3/movie/popular?api_key=6aef78f9dbb8761ef7757105efd6b161&language=en-US&page=1"

  $.ajax({
    url: themoviedbMostPopular,
    method: "GET"
  }). done(function(response){
    console.log(response);
    showMovies(response);
  })


// pull top 20 most popular movies from themovieDB
function showMovies(movieDiv) {
  $(".movieDB").empty(); // empty the top 20 browse movies

    var moviesLimit = 20;

    for (var i = 0; i < moviesLimit; i++) {
        var movieTitle = movieDiv.results[i].title;
        console.log("Browse List #" + i + ": " + movieTitle);

        var movieImgURL = movieDiv.results[i].poster_path;
        var movieReleaseDate = movieDiv.results[i].release_date;

        var movieImg = $("<img src='https://image.tmdb.org/t/p/w92/" + movieImgURL + "'>");
        movieImg.attr("data-title", movieTitle);
        movieImg.attr("data-releasedate", movieReleaseDate);
        movieImg.attr("id", "browseMovie" + i);
        movieImg.addClass("movieposter");
        movieImg.attr("data-state", "unselected");

        $(".movieDB").append(movieImg);
    }
  }


  ////////////////////////////////////
  // *** MOVIES FOR EACH GENRE *** //
  ///////////////////////////////////

$("#dropdown-genres a").click(function() {
  event.preventDefault();
  var genre = $(this).attr("data-genre");
  var genrename = $(this).attr("data-genrename");
  console.log(genre);
  $("#browse-header").html(genrename);

  var themoviedbGenreURL = "https://api.themoviedb.org/3/genre/" + genre + "/movies?" + "api_key=6aef78f9dbb8761ef7757105efd6b161" + "&language=en-US&include_adult=false&sort_by=created_at.asc"

    $.ajax({
      url: themoviedbGenreURL,
      method: "GET"
    }). done(function(genreResponse){
      console.log(genreResponse);
      genreMovies(genreResponse);
    })

  function genreMovies(movieDiv) {
    $(".movieDB").empty(); // empty the top 20 browse movies

      var moviesLimit = 20;

      var htmlString = "";
      for (var i = 0; i < moviesLimit; i++) {

        var layoutArr = [
          "<ul class='grid cs-style-1'>",
          "<li>",
          "<figure>",
          "#IMAGE",
          "<figcaption>",
          "<h3>#TITLE</h3>",
          "<span></span>",
          "<a href='http://dribbble.com/shots/1115632-Camera'>Take a look</a>",
          "</figcaption>",
          "</figure>",
          "</li>",
          "</ul>",
        ]

          var movieTitle = movieDiv.results[i].title;
          var movieOverview = movieDiv.results[i].overview;

          var movieImgURL = movieDiv.results[i].poster_path;
          var movieReleaseDate = movieDiv.results[i].release_date;

          layoutArr[3] = "<img src='https://image.tmdb.org/t/p/w92/" + movieImgURL + "'>";
          layoutArr[5] = layoutArr[5].replace('#TITLE', movieTitle);
          layoutArr[6] = layoutArr[6].replace('', movieOverview);
          var layoutString = layoutArr.join('');
          htmlString += layoutString;
          // var movieImg = $();

          // var movieImg = $("<img src='https://image.tmdb.org/t/p/w92/" + movieImgURL + "'>");
          // movieImg.attr("data-title", movieTitle);
          // movieImg.attr("data-releasedate", movieReleaseDate);
          // movieImg.attr("id", "browseMovie" + i);
          // movieImg.addClass("movieposter");
          // movieImg.addClass("grid");
          // movieImg.addClass("cs-style-1");
          // movieImg.attr("data-genre", genre);
          // movieImg.attr("data-state", "unselected");
          //
          // $(".movieDB").append(movieImg);
      }

      $(".movieDB").html(htmlString);
    };
    });


//////////////////////////
// *** HOVER CARDS *** //
/////////////////////////



//////////////////////////
// *** YOUTUBE API *** //
/////////////////////////

var youtubeAPI = "https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&q=jumanji+trailer&key=AIzaSyBMvI37OsXF8l5EcbltKSRLuqq0mp_Nr1A"

$.ajax({
  url: youtubeAPI,
  method: "GET"
}).
done(function(youTubeResponse){
  console.log(youTubeResponse);

  var jumanjiVideo = youTubeResponse.items[0].id.videoId
  var jumanjiURL = "https://www.youtube.com/watch?v=" + jumanjiVideo

  console.log(jumanjiURL)
})

/////////////////////////////////
// *** ON CLICK FUNCTIONS *** //
///////////////////////////////


////////////////////
// *** LOG-IN *** //
///////////////////

// create a new user
// $(".register form").on("submit", function(event) {
//   event.preventDefault();
//
//   var email = $(".register .email").val();
//   var password = $(".register .password").val();
//
//   firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then(function(user) {
//       console.log(user);
//     });
//     .catch(function(err) {
//       console.log(err);
//     })
//
//   }

// user log-in
// $(".login form").on("submit", function(event) {
//   event.preventDefault();
//
//   var email = $(".register .email").val();
//   var password = $(".register .password").val();
//
//   firebase.auth().signInWithEmailAndPassword(email, password)
//   .then(function(user) {
//     console.log(user);
//   });
//   .catch(function(err) {
//     console.log(err);
//   )};
// }

// get current user

// firebase.auth().onAuthStateChanged(function(user) {
//   // $("insert id here").off();
//
//   if (user) {
//
//     // $("insert id here").on("submit",function(event) {
//       // event.preventDefault();
//       // var variable = $("insert id here").val();
//     // firebase.database().ref("/users/" + user.uid).child("/todos").push(todo);
//     // });
//
//
//   }
//   else {
//
//   }
// })

// add sign off button here



})
