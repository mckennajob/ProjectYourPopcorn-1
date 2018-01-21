$(document).ready(function() {

//////////////////////////////
// *** GLOBAL VARIABLES *** //
//////////////////////////////

var genreList = ["Action", "Animation", "Comedy", "Documentary", "Drama", "Family", "Horror", "Romance", "SciFi", "Thriller"] // note: we may not need this

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

 var database = firebase.database(); // create reference to firebase



/////////////////////////////////////
// *** MOVIES TO SHOW ON LOAD *** //
////////////////////////////////////

// ajax call to pull initial movie browse list "Most Popular""
  var themoviedbMostPopular = "https://api.themoviedb.org/3/movie/popular?api_key=6aef78f9dbb8761ef7757105efd6b161&language=en-US&page=1"

  $.ajax({
    url: themoviedbMostPopular,
    method: "GET"
  }). done(function(response){
    console.log(response);
    showMovies(response);
  })

// display the "Most Popular" browse list on the page
function showMovies(movieDiv) {
  $(".movieDB").empty(); // empty the top 20 browse movies

    var moviesLimit = 20; // # of movies to show on page
    var htmlString = ""; // this will be the HTML string we create and will append to the page
    var listTag = "<ul class='grid cs-style-1'>"; // needed for the hovercard
    var listCloseTag = "</ul>"; // needed for the hovercard

    for (var i = 0; i < moviesLimit; i++) {
        var movieTitle = movieDiv.results[i].title; // this gets the movie title from the ajax call
        var movieOverview = movieDiv.results[i].overview; // this gets the movie synopsis from the ajax call

        var movieNum = 0; // local variable for console logging purposes
        movieNum = i + 1; // for console logging purposes
        console.log("Most Popular #" + movieNum + ": " + movieTitle);

        var movieImgURL = movieDiv.results[i].poster_path; // this gets the movie image from the ajax call
        var movieReleaseDate = movieDiv.results[i].release_date; // this gets the movie release date from the ajax call

        // BEGIN -- this code below will truncate the length of the synopsis
        var len = 125;
        var overview = movieOverview
        if (overview) {
          var truncate = movieOverview;
          if (truncate.length > len) {
            truncate = truncate.substring(0, len);
            truncate = truncate.replace(/\w+$/, '');
            truncate += "...";
            truncate += '<br><a href="#" ' +
              'onclick="this.parentNode.innerHTML=' +
              'unescape(\''+escape(movieOverview)+'\');return false;">' +
              'read more<\/a>';
            movieOverview = truncate;
          }
        }
        // END -- code to truncate length of synopsis


        // BEGIN -- the code below makes the movies show on screen AND makes the hovercards work
          var layoutArr = [
            "<li>",
            "<figure>",
            "#IMAGE",
            "<figcaption>",
            "<h3>#TITLE</h3>",
            "#OVERVIEW",
            "<button type='button' class='btn btn-primary youtube-link' data-toggle='modal' data-target='#exampleModalCenter' data-title='#datatitle'>View the trailer</button>",
            "</figcaption>",
            "</figure>",
            "</li>",
          ]

        layoutArr[2] = "<img src='https://image.tmdb.org/t/p/w92/" + movieImgURL + "' data-title='" + movieTitle + "' data-releasedate='" + movieReleaseDate + "' id='browseMovie" + i + "' data-state='unselected' class='movieposter'>";
        $(layoutArr[2]).addClass("movieposter");
        layoutArr[4] = layoutArr[4].replace('#TITLE', movieTitle);
        layoutArr[5] = layoutArr[5].replace('#OVERVIEW', "<span class='overview-text'>" + movieOverview + "</span>");
        layoutArr[6] = layoutArr[6].replace('#datatitle', movieTitle);
        var layoutString = layoutArr.join('');
        htmlString += layoutString;
        console.log(htmlString);

    }
      $(".movieDB").html(listTag + htmlString + listCloseTag);
      // END -- code for showing movies and hovercards
    };




  ///////////////////////////////////////////
  // *** MOVIES TO SHOW FOR EACH GENRE *** //
  //////////////////////////////////////////

$("#dropdown-genres a").click(function() { // on click function for choosing a genre on the dropdown menu
  event.preventDefault();

  var genreCode = $(this).attr("data-genre"); // this pulls the genre code from the movie clicked - comes from HTML file
  var genreName = $(this).attr("data-genrename"); // this pulls the genre name from the movie clicked - comes from HTML file

  $("#browse-header").html(genreName); // this changes the genre header on the page

  // URL for the API call, which is based on the genre that is chosen from the dropdown
  var themoviedbGenreURL = "https://api.themoviedb.org/3/genre/" + genreCode + "/movies?" + "api_key=6aef78f9dbb8761ef7757105efd6b161" + "&language=en-US&include_adult=false&sort_by=created_at.asc"

    $.ajax({
      url: themoviedbGenreURL,
      method: "GET"
    }). done(function(genreResponse){
      console.log(genreResponse);
      genreMovies(genreResponse);
    })

  function genreMovies(movieDiv) {
    $(".movieDB").empty(); // empty the top 20 browse movies so that we can load the new ones

      var moviesLimit = 20;  // # of movies to show on page
      var htmlString = ""; // this will be the HTML string we create and will append to the page
      var listTag = "<ul class='grid cs-style-1'>"; // needed for the hovercard
      var listCloseTag = "</ul>"; // needed for the hovercard

      for (var i = 0; i < moviesLimit; i++) {

          var movieTitle = movieDiv.results[i].title; // this gets the movie title from the ajax call
          var movieOverview = movieDiv.results[i].overview; // this gets the movie synopsis from the ajax call

          var movieImgURL = movieDiv.results[i].poster_path; // this gets the movie image from the ajax call
          var movieReleaseDate = movieDiv.results[i].release_date; // this gets the movie release date from the ajax call

          // BEGIN -- this code below will truncate the length of the synopsis
          var len = 125; // total number of letters we'll allow
          var overview = movieOverview; // this pulls the synopsis from our ajax call
          if (overview) {
            var truncate = movieOverview;
            if (truncate.length > len) { // if the length of our synopsis is longer than 125, we will truncate it
              truncate = truncate.substring(0, len); // this prints out only the first 125 characters
              truncate = truncate.replace(/\w+$/, ''); // this makes sure a word isn't cut off in the middle of the word
              truncate += "...";
              truncate += '<br><a href="#" ' +
                'onclick="this.parentNode.innerHTML=' +
                'unescape(\''+escape(movieOverview)+'\');return false;">' +
                'read more<\/a>'; // this adds a "read more" link that will show the rest of the synopsis when clicked
              movieOverview = truncate;
            }
          }
          // END -- code to truncate length of synopsis


          // BEGIN -- the code below makes the movies show on screen AND makes the hovercards work
            var layoutArr = [
              "<li>",
              "<figure>",
              "#IMAGE",
              "<figcaption>",
              "<h3>#TITLE</h3>",
              "#OVERVIEW",
              "<button type='button' class='btn btn-primary youtube-link' data-toggle='modal' data-target='#exampleModalCenter' data-title='#datatitle'>View the trailer</button>",
              "</figcaption>",
              "</figure>",
              "</li>",
            ]

          layoutArr[2] = "<img src='https://image.tmdb.org/t/p/w92/" + movieImgURL + "' data-title='" + movieTitle + "' data-releasedate='" + movieReleaseDate + "' id='browseMovie" + i + "' data-state='unselected' class='movieposter'>";
          $(layoutArr[2]).addClass("movieposter");
          layoutArr[4] = layoutArr[4].replace('#TITLE', movieTitle);
          layoutArr[5] = layoutArr[5].replace('#OVERVIEW', "<span class='overview-text'>" + movieOverview + "</span>");
          layoutArr[6] = layoutArr[6].replace('#datatitle', movieTitle);
          var layoutString = layoutArr.join('');
          htmlString += layoutString;
      }
        $(".movieDB").html(listTag + htmlString + listCloseTag);
        // END -- code for showing movies and hovercards

    };
  });


//////////////////////////
// *** YOUTUBE API *** //
/////////////////////////



$('body').on('click', '.youtube-link', function(){
  // $('#player').append.attr('src', '.movieposter')
  // var title = $('.movieposter').data-title;
  $(".youtube-test").empty();

  console.log(this);
  // console.log($(this).attr("data-title"));


// var callYouTube = function(){
var title = $(this).attr("data-title");
// console.log(title);

var youtubeAPI = "https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&q=" + title + "official+trailer" + "&key=AIzaSyBMvI37OsXF8l5EcbltKSRLuqq0mp_Nr1A"

$.ajax({
  url: youtubeAPI,
  method: "GET"
}).
done(function(youTubeResponse){
  console.log(youTubeResponse);

  var titleVideo = youTubeResponse.items[0].id.videoId
  var titleURL = "https://www.youtube.com/watch?v=" + titleVideo

  console.log(titleURL);

  var embedURL = "https://www.youtube.com/embed/" + titleVideo;

  var testVideo = "<iframe width='560' height='315' src='" + embedURL + "' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>"

  // var watchTrailer = "<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"></button>"

  console.log(testVideo);
  $(".youtube-test").append(testVideo);



  // $(".watchTrailer").append(watchTrailer);
})
// }

})











//Pass the titleURL to the iFrame



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
