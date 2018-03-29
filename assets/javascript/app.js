var gameCnt = $("#gameCont");

// ----------------------------------------------------------------------
// VARIABLES
// ----------------------------------------------------------------------
var counter = 30;
var questions = ["Roy Rogers' German Shepherd dog was named what?", " John Kennedy's German Shepherd was named?", "German Shepherd's are a member of which group of purebred dogs?", "Franklin D. Roosevelt's German Shepherd was named?",
"Who was the first GSD to be trained as a working guide dog?", "Which German Shepherd was the first canine silent movie film star in 1921?", "What is the average litter size in the German Shepherd Dog?", "Which coat color in the GSD is disqualified from being shown in the AKC conformation ring?"
];

var answer = [
  ["Jungle, the Great Dog", "Bullet, the Wonder Dog", "Handsome, the Super Dog", "Super, the Best Dog"],
  ["Wolfie", "Chipper", "Clipper", "Crazy"],
  ["Herding Group", "Flying", "Water", "Earth"],
  ["Laser", "Major", "Pain", "Captain"],
  ["Angel, the first Walking dog in 1980", "Flicker, the first fire dog in 1700", "Buddy, the first Seeing Eye dog in 1928.", "Geoffry, the first River dog in 2015"],
  ["Strongheart", "Braveheart", "Hero", "Terminator"],
  ["11 puppies", "10 puppies", "9 puppies", "8 puppies"],
  ["Red", "White", "Black", "Gold"],
];

var correctAnswers = ["Bullet, the Wonder Dog", "Clipper", "Herding Group", "Major", "Buddy, the first Seeing Eye dog in 1928.", "Strongheart", "8 puppies", "White"];
var questionCounter = 0;
var selectedAnswer;
var clock;
var totalCorrect = 0;
var totalIncorrect = 0;
var totalUnAnswered = 0;


$(document).ready(function() {
  function gameSetup() {
    gameCnt.empty();
    gameCnt.html("<button class='start btn btn-outline-light my-5'>Start Game!!!</button>");
  }
  gameSetup();

// ----------------------------------------------------------------------
// AJAX
// ----------------------------------------------------------------------
  // This function, generates HTML and Starts Counter

  $("body").on("click", ".start", function(event){
    generateHTML();
    timer();
  });

  $("body").on("click", ".answer", function(event){
    selectedAnswer = $(this).text();
    if(selectedAnswer === correctAnswers[questionCounter]) {
      clearInterval(clock);
      userCorrect();
    }
    else {
      clearInterval(clock);
      userIncorrect();
    }
  });
  $("body").on("click", ".reset", function(event){
    resetGame();
  }); // Closes reset-button click
});

// ----------------------------------------------------------------------
// JavaScript
// ----------------------------------------------------------------------

function pause() {
  if (questionCounter < 7) {
    questionCounter++;
    generateHTML();
    counter = 30;
    timer();
  }
  else {
    finalScreen();
  }
}

function timer() {
  clock = setInterval(thirtySeconds, 1000);
  function thirtySeconds() {
    if (counter === 0) {
      clearInterval(clock);
      resetGame();
    }
    if (counter > 0) {
      counter--;
    }
    $(".timer").html(counter);
  }
}

function userCorrect() {
  totalCorrect++;
  gameHTML = "<div class='py-3'><h4>Time Remaining: <small class='blueClr timer'>" + counter + "</small></h4>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" ;
  $(".mainArea").html(gameHTML);
  setTimeout(pause, 10);
}

function userIncorrect() {
  totalIncorrect++;
  gameHTML = "<div class='py-3'><h4>Time Remaining: <small class='blueClr timer'>" + counter + "</small></h4>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
  $(".mainArea").html(gameHTML);
  setTimeout(pause, 10);
}

function generateHTML(){
  gameHTML =
  "<div class='py-3'><h4>Time Remaining: <small class='blueClr timer'>30</small></h4>" +
  "<p id='text-area' class='py-2'>" + questions[questionCounter] + "</p>" +
  " <div id='gameAnswer' class='pb-3 d-flex justify-content-left flex-column'>" +
  " <button type='button' class='btn btn-outline-secondary mt-1 mb-3 d-flex justify-content-left w-100 answer'>" + answer[questionCounter][0] + "</button>" +
  " <button type='button' class='btn btn-outline-secondary mt-1 mb-3 d-flex justify-content-left w-100 answer'>" + answer[questionCounter][1] + "</button>" +
  " <button type='button' class='btn btn-outline-secondary mt-1 mb-3 d-flex justify-content-left w-100 answer'>" + answer[questionCounter][2] + "</button>" +
  " <button type='button' class='btn btn-outline-secondary mt-1 mb-3 d-flex justify-content-left w-100 answer'>" + answer[questionCounter][3] + "</button>" ;
  gameCnt.html(gameHTML);
}

function finalScreen() {
  gameHTML =  "<h3 class='py-4'>Game Over" + "</h3>" + "<p>Correct Guesses: " + totalCorrect + "</p>" + "<p>Incorrect Guesses: " + totalIncorrect + "</p>" + "<p class='reset-container'><a class='reset btn btn-outline-light mt-4 mb-3' href='#' role='button'>New Game!</a></p>";
  gameCnt.html(gameHTML);
}

function resetGame() {
  questionCounter = 0;
  totalCorrect = 0;
  totalIncorrect = 0;
  counter = 30;
  generateHTML();
  timer();
}
