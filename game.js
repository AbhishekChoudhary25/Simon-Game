var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern=[];

var userClickedPattern=[];

var level = 0;

var started = false;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on('click', function () {
  var  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playAudio(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function startOver(){
  gamePattern=[];

  level = 0;

  started = false;
}


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("sucess");

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("wrong");

    playAudio("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
    $("."+currentColour).removeClass("pressed");
  },100);

}

function playAudio(input){
  var music =new Audio("sounds/"+input+".mp3");
  music.play()
}

function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*3) + 1;
  var randomChoosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColour);
  $("#"+randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // playAudio(randomChoosenColour);

  level++;

  $("#level-title").html("level " + level);

}
















// animatePress(randomChoosenColour);
