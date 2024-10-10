// Global variables declarations

const OPTIONS = ["rock", "paper", "scissors"];
let playerOption;
let opponentOption;

let rounds = 1;
let humanScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll("button");
const playerPreview = document.querySelector(".player .preview");
const opponentPreview = document.querySelector(".opponent .preview");
const playerOptionPreview = document.createElement("p");
const opponentOptionPreview = document.createElement("p");
const container = document.querySelector(".container");
const result = document.querySelector(".result");
const opponentSection = document.querySelector(".opponent");
const playerSection = document.querySelector(".player");
const restartButton = document.querySelector(".restart");
const confirmButton = document.querySelector(".confirm")
const optionsDiv = document.querySelector(".options");
const playerScore = document.querySelector(".player-score");
const opponentScore = document.querySelector(".opponent-score");
const roundCounter = document.querySelector(".round-counter");
const finalResult = document.querySelector(".final-result");

opponentSection.style.display = "none";
playerOptionPreview.style.fontSize = "2rem";
opponentOptionPreview.style.fontSize = "4rem";

playerPreview.appendChild(playerOptionPreview);
opponentPreview.appendChild(opponentOptionPreview);

// Function declarations

/**
 * Returns the emoji representation of the given option.
 * option - The option to convert to emoji ("rock", "paper", or "scissors").
 */
const getOptionEmoji = option => {
    switch(option)
    {
        case "rock":
            return "🪨";
        case "paper":
            return "📄";
        case "scissors":
            return "✂️";
        default:
            return;
    }
}

/**
 * Randomly selects and returns a choice from the given array.
 * arr - The array of options to choose from.
 */
const getComputerChoice = arr => OPTIONS[Math.floor(Math.random() * arr.length)];

/**
 * Makes a move for the computer opponent and updates the UI.
 * This function is called when the player has made their selection.
 */
const makeComputerMove = () => {
    if (playerOption === undefined)
    {
        return;
    }
    opponentOption = getComputerChoice(OPTIONS);
    const opponentMessage = document.querySelector(".opponent-message");
    opponentMessage.textContent = "The opponent has selected";
    opponentOptionPreview.textContent = getOptionEmoji(opponentOption);
    opponentSection.style.display = "flex";
}

/**
 * Determines the winner of the game based on player and opponent choices.
 * plChoice - The player's choice.
 * opChoice - The opponent's choice.
 */
const determineWinner = (plChoice, opChoice) => {
    
    if (plChoice === undefined)
    {
        return;
    }

    if (plChoice === opChoice)
    {
        return "tie";
    }

    if (plChoice === "rock")
    {
        if (opChoice === "scissors")
        {
            return "player";
        }

        else if (opChoice === "paper")
        {
            return "opponent";
        }
    }

    else if (plChoice === "paper")
    {
        if (opChoice === "rock")
        {
            return "player";
        }

        else if (opChoice === "scissors")
        {
            return "opponent";
        }
    }

    else if (plChoice === "scissors")
    {
        if (opChoice === "paper")
        {
            return "player";
        }

        else if (opChoice === "rock")
        {
            return "opponent";
        }
    }
}

/**
 * Displays the result of the game in the UI and updates the scores.
 * winner - The winner of the game ("player", "opponent", "tie", or undefined).
 */
const displayResult = winner => {
    result.classList.remove("error", "win", "loss", "tie");
    if (winner === undefined)
    {
        result.classList.add("error");
        result.textContent = "Please make sure you have selected an option.";
    }

    else if (winner === "player")
    {
        humanScore++;
        playerScore.textContent = `Your score: ${humanScore}`;
        result.classList.add("win");
        result.textContent = `You have won! ${playerOption} beats ${opponentOption}!`;
    }

    else if (winner === "opponent")
    {
        computerScore++;
        opponentScore.textContent = `Opponent's score: ${computerScore}`;
        result.classList.add("loss");
        result.textContent = `You have lost! ${opponentOption} beats ${playerOption}!`;
    }

    else if (winner === "tie")
    {
        result.classList.add("tie");
        result.textContent = `It's a tie! Both of you have selected ${playerOption}`;
    }
}

/**
 * Resets the game state and UI to the initial condition and start a new round.
 */
const startNewRound = () => {
    rounds++;
    roundCounter.textContent = `Round: ${rounds}`;
    const playerMessage = document.querySelector(".player-message");
    playerOption = undefined;
    opponentOption = undefined;
    opponentSection.style.display = "none";
    optionsDiv.style.display = "block";
    result.classList.remove("error", "win", "loss", "tie");
    result.textContent = "";
    playerOptionPreview.textContent = "";
    playerOptionPreview.style.fontSize = "2rem";
    playerMessage.textContent = "";
}


/**
 * Resets the game state to its initial values.
 * This function resets the round counter, human score, and computer score to zero.
 */
const resetGame = () => {
    rounds = 0;
    humanScore = 0;
    computerScore = 0;
    playerScore.textContent = `Your score: ${humanScore}`;
    opponentScore.textContent = `Opponent's score: ${computerScore}`;
    roundCounter.textContent = `Round: ${rounds}`;
    restartButton.value = "new-round";
    restartButton.textContent = "Next round"
    playerSection.style.display = "flex";
    finalResult.style.display = "none";
}

/**
 * Displays the final result of the game by hiding the player and opponent sections,
 * clearing previous result messages, and showing the final result message based on the scores.
 *
 * plScore - The player's score.
 * opScore - The opponent's (computer's) score.
 */
const showFinalResult = (plScore, opScore) => {
    playerSection.style.display = "none";
    opponentSection.style.display = "none";
    result.classList.remove("error", "win", "loss", "tie");
    result.textContent = "";
    finalResult.style.display = "flex";
    let resultText;

    resultText = plScore > opScore ? "Congratulations! You have won against the computer!":
        opScore > plScore ? "You have lost against the computer. How embarrassing...":
        "Looks like you tied with the computer. Try playing again.";

    finalResult.textContent = resultText;
}
// Add event listeners to all buttons

for (const button of buttons) {

    button.addEventListener('mousedown', e => {
        e.target.classList.add('clicked');
    });

    button.addEventListener('mouseup', e => {
        e.target.classList.remove('clicked');
    });

    if (button.classList.contains('option'))
    {
        button.addEventListener('click', e => {
            playerOption = e.target.value;
            let emojiPreview = getOptionEmoji(playerOption);
            playerOptionPreview.textContent = emojiPreview;
        })
    } 
}

confirmButton.addEventListener('click', e => { 
    makeComputerMove();

    let winner = determineWinner(playerOption, opponentOption);
    displayResult(winner);
    if (playerOption !== undefined)
    { 
        const playerMessage = document.querySelector(".player-message");
        playerMessage.textContent = "You have selected";
        optionsDiv.style.display = "none";
        confirmButton.style.display = "none";
        playerOptionPreview.style.fontSize = "4rem";
        restartButton.style.display = "block";
    }
});

restartButton.addEventListener('click', e => {
    if (e.target.value === "reset")
    {
        resetGame();
    }
    if (humanScore === 5 || computerScore === 5){
        showFinalResult(humanScore, computerScore); 
        e.target.value = "reset";
        e.target.textContent = "Restart"
        return;
    }
    startNewRound();
    e.target.style.display = "none";
    confirmButton.style.display = "block";
});

// Fix bug where buttons stay depressed when the mouse click is released away from the button

window.addEventListener("mouseup", () => {
    for (const button of buttons) {
        button.classList.remove("clicked");
    }
})


