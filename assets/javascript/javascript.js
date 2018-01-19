$(document).ready(function() {

//////////////////////////////
// *** GLOBAL VARIABLES *** //
//////////////////////////////

var genreList = ["Action", "Animation", "Comedy", "Documentary", "Drama", "Family", "Horror", "Romance", "SciFi", "Thriller"]

// var numBrowseMovies = 0; // number of movies on the browse page (left hand side)
// var browseMoviesArray = []; // array of movies to browse from (left hand side)

var numWatchList = 0; // number of movies in "what to watch" list (right hand side)
var watchListArray = []; // array of movies to watch (right hand side)

var movieBank = []; // movies you've watched

var themovieDBgenres = {
  Action: 28,
  Animation: 16,
  Comedy: 35,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Horror: 27,
  Romance: 10749,
  SciFi: 878,
  Thriller: 53

};

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

 // firebase.initializeApp(config);


/////////////////////////////////////
// *** MOVIES TO SHOW ON LOAD *** //
////////////////////////////////////

// ajax call to pull initial movie browse list
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
        movieImg.attr("data-state", "unselected");

        $(".movieDB").append(movieImg);

    }
  }

// pull top 20 for each genre based on dropdown selection
// Note from Lissa: the click function below is just a test that we can GET movies by genre from the API -- if you click on ANY item in the dropdown menu, it will pull action movies
$("#dropdown-genres").click(function() {
  event.preventDefault();

  // ajax call to pull by genre
  var genre = "28" // testing this for action movies which is id 28 on themovieDB - https://api.themoviedb.org/3/genre/movie/list?api_key=6aef78f9dbb8761ef7757105efd6b161&language=en-US
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
        console.log(movieDiv);
        for (var i = 0; i < moviesLimit; i++) {
            var movieTitle = movieDiv.results[i].title;
            console.log("Genre Browse List #" + i + ": " + movieTitle);

            var movieImgURL = movieDiv.results[i].poster_path;
            var movieReleaseDate = movieDiv.results[i].release_date;

            var movieImg = $("<img src='https://image.tmdb.org/t/p/w92/" + movieImgURL + "'>");
            movieImg.attr("data-title", movieTitle);
            movieImg.attr("data-releasedate", movieReleaseDate);
            movieImg.attr("id", "browseMovie" + i);
            movieImg.attr("data-state", "unselected");

            $(".movieDB").append(movieImg);

        }
};
});






  // done(function(response) {
  //
  //
  // });



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
