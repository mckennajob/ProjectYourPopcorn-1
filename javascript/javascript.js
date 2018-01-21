$(document).ready(function() {

//////////////////////////////
// *** GLOBAL VARIABLES *** //
//////////////////////////////

//number of movies on browse page
var numBrowseMovies = 0;
// array of movies to watch on browse page
var browseMoviesArray = [];
// number of movies in the watch list
var numWatchList = 0;
// array of movies in the watch list
var watchListArray = [];
// array of movies watched
var movieBank = [];



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


/////////////////////
// *** ON LOAD *** //
////////////////////


/////////////////////////////////
// *** ON CLICK FUNCTIONS *** //
///////////////////////////////


////////////////////
// *** LOG-IN *** //
///////////////////

// create a new user
$(".register form").on("submit", function(event) {
  event.preventDefault();

  var email = $(".register .email").val();
  var password = $(".register .password").val();

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(user) {
      console.log(user);
    });
    .catch(function(err) {
      console.log(err);
    })

  }

// user log-in
$(".login form").on("submit", function(event) {
  event.preventDefault();

  var email = $(".register .email").val();
  var password = $(".register .password").val();

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(user) {
    console.log(user);
  });
  .catch(function(err) {
    console.log(err);
  )};
}

// get current user

firebase.auth().onAuthStateChanged(function(user) {
  // $("insert id here").off();

  if (user) {

    // $("insert id here").on("submit",function(event) {
      // event.preventDefault();
      // var variable = $("insert id here").val();
    // firebase.database().ref("/users/" + user.uid).child("/todos").push(todo);
    // });


  }
  else {

  }
})

// add sign off button here



})
