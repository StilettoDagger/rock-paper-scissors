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
const opponentMessage = document.createElement("p");

playerOptionPreview.style.fontSize = "2rem";
opponentOptionPreview.style.fontSize = "4rem";

playerPreview.appendChild(playerOptionPreview);
opponentPreview.appendChild(opponentMessage)
opponentPreview.appendChild(opponentOptionPreview);

console.table(buttons);

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

const getRandomOption = arr => OPTIONS[Math.floor(Math.random() * arr.length)];

const makeComputerMove = function() {
    opponentOption = getRandomOption(OPTIONS);
    opponentMessage.textContent = "The opponent has picked"
    opponentOptionPreview.textContent = getOptionEmoji(opponentOption);
}

const determineWinner = (plOption, opOption) => {
    
    if (plOption === undefined || opOption === undefined)
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
        button.addEventListener('click', () => { 
            makeComputerMove();
            let winner = determineWinner(playerOption, opponentOption);
            displayResult(winner);
        })
    }
}



