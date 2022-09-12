var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var currentResponse = 0;
var started = false;

function nextSequence() {
    var randomNo = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNo];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour)
        .fadeOut(100)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];
}

$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    if (currentResponse < level) {
        if (checkAnswer(currentResponse)) {
            currentResponse++;
        }

        else {
            currentResponse = 0;
            gameOver();
        }
    }

    if (level == currentResponse && level != 0) {
        currentResponse = 0;
        setTimeout(nextSequence(), 1000);
    }
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).toggleClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).toggleClass("pressed");
    }, 100);
}

$(document).on("keypress", function (e) {
    if (started === false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        return true;
    }
    return false;
}


function gameOver() {
    playSound('wrong');

    $('body').toggleClass('game-over');
    $('h1').text('Game Over, Press Any Key to Restart');
    setTimeout(function () {
        $('body').toggleClass('game-over');
    }, 200);
    startOver();
}
// reset all the values to 0
function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
}