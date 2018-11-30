// Setting up the scores
let userScore = 0;
let compScore = 0;

// Setting all Elements
const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("comp-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

// Setting subs for text
const smallWordUser = "user".fontsize(3).sub();
const smallWordComp = "comp".fontsize(3).sub();

// Setting comp choices for pop up
const showCompRock_div = document.getElementById("show-comp-rock");
const showCompPaper_div = document.getElementById("show-comp-paper");
const showCompScissors_div = document.getElementById("show-comp-scissors");

// Setting comp choices to be random
function getCompChoice() {
    const choices = ["r", "p", "s"];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

// Reseting comp choices
function resetCompRPS() {
    showCompRock_div.style.display = "none";
    showCompPaper_div.style.display = "none";
    showCompScissors_div.style.display = "none";
}

// Setting what happens deppend on getCompChoice
function compMove(computerChoice) {
    if (computerChoice === "r") {
        resetCompRPS();
        showCompRock_div.style.display = "block";
    } else if (computerChoice === "p") {
        resetCompRPS();
        showCompPaper_div.style.display = "block";
    } else {
        resetCompRPS();
        showCompScissors_div.style.display = "block";
    }
}

// Converting letters to word for win,lose, draws functions
function convertToWord(letter) {
    if (letter === "r") return "Rock";
    if (letter === "p") return "Paper";
    if (letter === "s") return "Scissors";
}

// Setting win function and what happens if we win
function win(userChoice, computerChoice) {
    userScore++;
    const userChoice_div = document.getElementById(userChoice);
    userScore_span.innerHTML = userScore;
    compScore_span.innerHTML = compScore;
    result_p.innerHTML = `${convertToWord(userChoice)}${smallWordUser} wins over ${convertToWord(computerChoice)}${smallWordComp}. You win!`;
    userChoice_div.classList.add('green-glow');
    setTimeout(() => userChoice_div.classList.remove('green-glow'), 400);
    compMove(computerChoice);
}

// Setting lose function and what happens if we lose
function lose(userChoice, computerChoice) {
    compScore++;
    const userChoice_div = document.getElementById(userChoice);
    userScore_span.innerHTML = userScore;
    compScore_span.innerHTML = compScore;
    result_p.innerHTML = `${convertToWord(userChoice)}${smallWordUser} loses over ${convertToWord(computerChoice)}${smallWordComp}. You lose!`;
    userChoice_div.classList.add('red-glow');
    setTimeout(() => userChoice_div.classList.remove('red-glow'), 400);
    compMove(computerChoice);
}

// Setting draw function and what happens if we have draw
function draw(userChoice, computerChoice) {
    const userChoice_div = document.getElementById(userChoice);
    userScore_span.innerHTML = userScore;
    compScore_span.innerHTML = compScore;
    result_p.innerHTML = `${convertToWord(userChoice)}${smallWordUser} is equal to ${convertToWord(computerChoice)}${smallWordComp}. It's draw!`;
    userChoice_div.classList.add('grey-glow');
    setTimeout(() => userChoice_div.classList.remove('grey-glow'), 400);
    compMove(computerChoice);
}

// Setting game where we use win, lose or draw functions, also we get comp choice with random getCompChoice function
function game(userChoice) {
    const computerChoice = getCompChoice();
    switch (userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice);
            break;
        case "sr":
        case "rp":
        case "ps":
            lose(userChoice, computerChoice);
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, computerChoice);
            break;
    }
}

// Reseting score for checkWhoWon function
function resetScore() {
    setTimeout(() => {
        userScore = 0;
        compScore = 0;
        userScore_span.innerHTML = userScore;
        compScore_span.innerHTML = compScore;
        result_p.innerHTML = "Feel free to start another game.";
    }, 300);
}

// Checking if game is over
function checkWhoWon() {
    setTimeout(() => { // setTimeout is there because we need to print score before alerting
        if (userScore === 5) {
            scoreBoard_div.classList.add("green-glow");
            setTimeout(() => scoreBoard_div.classList.remove('green-glow'), 800);
            setTimeout(() => alert("Congrats! You won!"), 200);
            resetScore();
        }
        if (compScore === 5) {
            scoreBoard_div.classList.add("red-glow");
            setTimeout(() => scoreBoard_div.classList.remove('red-glow'), 800);
            setTimeout(() => alert("Sorry, you lost!"), 200);
            resetScore();
        }
    }, 100)
}

// Setting user choices for pop up
const showUserRock_div = document.getElementById("show-user-rock");
const showUserPaper_div = document.getElementById("show-user-paper");
const showUserScissors_div = document.getElementById("show-user-scissors");

// Reseting user choices when we click on another one
function resetUserRPS() {
    showUserRock_div.style.display = "none";
    showUserPaper_div.style.display = "none";
    showUserScissors_div.style.display = "none";
}

// Main function for eventListeners 
function main() {
    rock_div.addEventListener("click", () => {
        game("r");
        resetUserRPS();
        showUserRock_div.style.display = "block";
        checkWhoWon();
    });
    paper_div.addEventListener("click", () => {
        game("p");
        resetUserRPS();
        showUserPaper_div.style.display = "block";
        checkWhoWon();
    });
    scissors_div.addEventListener("click", () => {
        game("s");
        resetUserRPS();
        showUserScissors_div.style.display = "block";
        checkWhoWon();
    });

}

// Calling main function
main();