$(document).ready(function() {

//////////////////////////////
// *** GLOBAL VARIABLES *** //
//////////////////////////////

var numBrowseMovies = 0; // number of movies on the browse page (left hand side)
var browseMoviesArray = []; // array of movies to browse from (left hand side)

var numWatchList = 0; // number of movies in "what to watch" list (right hand side)
var watchListArray = []; // array of movies to watch (right hand side)

var movieBank = []; // movies you've watched



/////////////////////////////////
// *** INITIALIZE FIREBASE *** //
/////////////////////////////////


 // var config = {
 //   apiKey: "AIzaSyDKV0NiT6QZsec00Klgqn9LzYzlRWXS7s0",
 //   authDomain: "projectpopcorn-192318.firebaseapp.com",
 //   databaseURL: "https://projectpopcorn-192318.firebaseio.com",
 //   projectId: "projectpopcorn-192318",
 //   storageBucket: "projectpopcorn-192318.appspot.com",
 //   messagingSenderId: "722185974282"
 // };
 // firebase.initializeApp(config);


/////////////////////
// *** ON LOAD *** //
////////////////////

// function loadTop25(){
//   $("#top25").empty(); // empty the top 25 browse movies
//   var movieLimit = 25;
//   for (var i = 0; i < movieLimit; i++) {
//     var
//   }
//
// }



  var themoviedbMostPopular = "https://api.themoviedb.org/3/movie/popular?api_key=6aef78f9dbb8761ef7757105efd6b161&language=en-US&page=1"


  $.ajax({
    url: themoviedbMostPopular,
    method: "GET"
  }).

  done(function(response){
    console.log(response);
    console.log(response.results[5].title);
    showMovies(response);
  })

function showMovies(movieDiv) {
    var moviesLimit = 10;

    for (var i = 0; i < moviesLimit; i++) {
        var movieTitle = movieDiv.results[i].title;
        console.log(movieTitle);

        var movieImgURL = movieDiv.results[i].poster_path;
        console.log(movieImgURL);

        // var movieDiv = $("<div>");
        var movieImg = $("<img src='https://image.tmdb.org/t/p/w500/" + movieImgURL + "'>");

        // movieDiv.append(movieImg);

        $("#top25").append(movieImg);


        //
        // var movieDiv = $("<div>");
        // movieDiv.append(movie);
        // $("#top25").append(movieDiv);

    }
  }



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
