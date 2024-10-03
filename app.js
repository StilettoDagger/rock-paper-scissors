// Global variables declarations

const OPTIONS = ["rock", "paper", "scissors"];
let playerOption;
let opponentOption;

const buttons = document.querySelectorAll("button");
const playerPreview = document.querySelector(".player .preview");
const opponentPreview = document.querySelector(".opponent .preview");
const playerOptionPreview = document.createElement("p");
const opponentOptionPreview = document.createElement("p");
const container = document.querySelector(".container");
const result = document.querySelector(".result");
const playerMessage = document.querySelector(".player-message");
const opponentSection = document.querySelector(".opponent");
const playerSection = document.querySelector(".player");
const resetButton = document.querySelector(".reset");
const confirmButton = document.querySelector(".confirm")
const optionsDiv = document.querySelector(".options");

opponentSection.style.display = "none";
playerOptionPreview.style.fontSize = "2rem";
opponentOptionPreview.style.fontSize = "4rem";

playerPreview.appendChild(playerOptionPreview);
opponentPreview.appendChild(opponentOptionPreview);

// Function declarations

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

const getComputerChoice = arr => OPTIONS[Math.floor(Math.random() * arr.length)];

const makeComputerMove = function() {
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

const determineWinner = (plOption, opOption) => {
    
    if (plOption === undefined)
    {
        return;
    }

    if (plOption === opOption)
    {
        return "tie";
    }

    if (plOption === "rock")
    {
        if (opOption === "scissors")
        {
            return "player";
        }

        else if (opOption === "paper")
        {
            return "opponent";
        }
    }

    else if (plOption === "paper")
    {
        if (opOption === "rock")
        {
            return "player";
        }

        else if (opOption === "scissors")
        {
            return "opponent";
        }
    }

    else if (plOption === "scissors")
    {
        if (opOption === "paper")
        {
            return "player";
        }

        else if (opOption === "rock")
        {
            return "opponent";
        }
    }
}

const displayResult = winner => {
    result.classList.remove("error", "win", "loss", "tie");
    if (winner === undefined)
    {
        result.classList.add("error");
        result.textContent = "Please make sure you have selected an option.";
    }

    else if (winner === "player")
    {
        result.classList.add("win");
        result.textContent = `You have won! ${playerOption} beats ${opponentOption}!`;
    }

    else if (winner === "opponent")
    {
        result.classList.add("loss");
        result.textContent = `You have lost! ${opponentOption} beats ${playerOption}!`;
    }

    else if (winner === "tie")
    {
        result.classList.add("tie");
        result.textContent = `It's a tie! Both of you have selected ${playerOption}`;
    }
}

const resetGame = function () {
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

    else if (button.classList.contains('confirm'))
    {
        
    }
}

confirmButton.addEventListener('click', e => { 
    makeComputerMove();

    let winner = determineWinner(playerOption, opponentOption);
    displayResult(winner);
    if (playerOption !== undefined)
    { 
        playerMessage.textContent = "You have selected";
        optionsDiv.style.display = "none";
        confirmButton.style.display = "none";
        playerOptionPreview.style.fontSize = "4rem";
        resetButton.style.display = "block";
    }
});

resetButton.addEventListener('click', e => {
    resetGame();
    e.target.style.display = "none";
    confirmButton.style.display = "block";
});



