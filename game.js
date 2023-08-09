let buttonColours = ["redCat", "blueCat", "greenCat", "yellowCat"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
level = 0;

$(".mobile").on("click", function () {
    if (started === false) {
        $(".btn").text("Level " + level);
        nextSequence()
        started = true;
    }
});

$(document).on("keydown", function () {
    if (started === false) {

        $(".big-title").text("Level " + level);
        nextSequence()
        started = true;
    }
});

$(".cats").on("click", function () {
    usenChosenColour = this.id;

    userClickedPattern.push(usenChosenColour);

    playSound(usenChosenColour);
    animatePress(usenChosenColour);
    checkAwnser(userClickedPattern.length - 1);
})

function nextSequence() {

    userClickedPattern = [];

    level++;
    $(".big-title").text("Level " + level);
    $(".btn").text("Level " + level);

    let randomNumber = (Math.floor(Math.random() * 4));

    let randomChosenColour = buttonColours[randomNumber];


    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name) {
    let audio = new Audio('sounds/' + name + '.mp3')

    audio.play();
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function checkAwnser(currentLevel) {

    console.log(currentLevel);

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000)
        }
    } else {
        wrong = new Audio ('sounds/wrong.mp3')
        wrong.play();

        $("body").addClass("gameOver");
        setTimeout(function () {
            $("body").removeClass("gameOver");
        }, 200)

        $("h1").text("Game Over, Press Any Key to Restart")

        $(".btn").text("Game Over, Click Here to Restart")

        startOver();
    }
}


function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}
