//$(document).ready(function(){
//  getPosts();
//})

function handleSignIn() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    //temporary console for feedback
    console.log(user.email);

  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function handleMessageFormSubmit(){
  var postTitle = $("#post-title").val();
  var postBody = $("#post-body").val();
  console.log(postTitle);
  addMessage(postTitle,postBody);
}

function addMessage(postTitle, postBody) {
  var postData = {
    title: postTitle,
    body: postBody
  }

  var database = firebase.database().ref("posts");

  var newPostRef = database.push();
  newPostRef.set(postData, function(error) {
    if (error) {
      console.log("Error writing to Firebase")
    } else {
      window.location.reload();
    }
  });

}

function getPosts(){
  return firebase.database().ref("posts").once('value').then(function(snapshot) {
    var posts = snapshot.val();
    console.log(posts);

    for(var postKey in posts) {
      var post = posts[postKey];
      $("#post-listing").append("<div>" + post.title + " - " + post.body + ("</div>"));
    }

  });
}


//$(document).ready(function(){
 // getWeather();
//})

function getWeather(searchQuery) {
  //weather for Lewisville TX: City Id = 4706057
  //var url = "https://api.openweathermap.org/data/2.5/weather?id=4706057&units=imperial&appid="+apiKey;
  var url = "https://api.openweathermap.org/data/2.5/weather?q="+searchQuery+"&units=imperial&appid="+apiKey;

  //empty returned data
  $(".city").text("");
  $(".temp").text("");
  $(".error-message").text("");

  $.ajax(url,{success: function(data){
    console.log(data);
    $(".city").text("City: " + data.name);
    $(".temp").text("Temperature (f): " + data.main.temp + "\xB0");
    $(".feels_like").text("Feels Like (f): " + data.main.feels_like + "\xB0");
    $(".humidity").text("Humidity: " + data.main.humidity + "%");
    $(".wind").text("Wind Speed: " + data.wind.speed + " mph");
  }, error: function(error){
    $(".error-message").text("An error occured");
}})
}

function searchWeather() {
  var searchQuery = $(".search").val();
  getWeather(searchQuery);
}

function showPicture(){
  // use jQuery ($ is shorthand) to find the div on the page and then change the html
  // 'rounded-circle' is a bootstrap thing! Check out more here: http://getbootstrap.com/css/
  $("#image").append('<img class="rounded-circle" src="images/high-five.gif"/>');
  $("p").html("High five! You're building your first web app!");

  // jQuery can do a lot of crazy stuff, so make sure to Google around to find out more
  
}