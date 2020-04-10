const weaponsContainer = document.querySelector(".choose");
const weapons = document.querySelectorAll(".image-bg");
const selectedText = document.querySelector(".selected-text");
const roundStatus = document.querySelector(".round-status");
const scoreText = document.querySelector(".current-score");
const modalContainer = document.querySelector(".modal-container");
const closeModalButton = document.querySelector(".close-button");
let score = 0;
let setScore;

let playerSelectedDiv;
let computerChoiceDiv;
let playerWeapon;
let computerWeapon;
const showChosenSection = document.querySelector(".chosen");
// console.log(weaponsContainer)



weaponsContainer.addEventListener("click", function (e) {
	if (e.target.className == "image-bg" || e.target.tagName == "IMG") {
		// console.log(true)
		weaponsContainer.style.display = "none";
		let divTarget;
		let imageTarget;

		if (e.target.className == "image-bg") {
			divTarget = e.target;
			playerSelectedDiv = divTarget.cloneNode(true);
			// console.log(playerSelectedDiv)
			showChosenSection.appendChild(playerSelectedDiv);
			showChosenSection.style.display = "flex";
			selectedText.style.display = "flex";
			// roundStatus.style.display = "block";
		} else if (e.target.tagName == "IMG") {
			imageTarget = e.target;
			playerSelectedDiv = imageTarget.parentNode.cloneNode(true);
			showChosenSection.appendChild(playerSelectedDiv);
			showChosenSection.style.display = "flex";
			selectedText.style.display = "flex";
			
		}
        // setTimeout(computerSelection,3000)
        setTimeout(function(){
            computerSelection();
            getPlayersWeapon();
            decideWinner(playerWeapon, computerWeapon);
            playAgain();
        }, 1000)
		
	}

	// console.log(true)
});

// Getting Computer's Choice

function computerSelection() {
	let random = Math.floor(Math.random() * 3);
	computerChoiceDiv = weaponsContainer.children[random].cloneNode(true);
	// console.log(computerChoiceDiv)
    showChosenSection.appendChild(computerChoiceDiv);
    roundStatus.style.display = "block";
}

// Get player and computer Weapon
function getPlayersWeapon() {
	playerWeapon = playerSelectedDiv.getAttribute("id");
	// console.log(playerWeapon)

	computerWeapon = computerChoiceDiv.getAttribute("id");
	// console.log(computerWeapon)
}

// Decide round winner

function decideWinner(playerWeapon, computerWeapon) {
	// console.log(`playerWeapon = ${playerWeapon}`)
	// console.log(`computerWeapon = ${computerWeapon}`)
	const deciderText = document.querySelector("#decider-text");
	let decider;

	if (playerWeapon == computerWeapon) {
		decider = "Draw";
	}

	if (playerWeapon == "rock") {
		if (playerWeapon == "rock" && computerWeapon == "scissors") {
			decider = "You Won";
		} else if (playerWeapon == "rock" && computerWeapon == "paper") {
			decider = "You Lost";
		}
	}
	if (playerWeapon == "paper") {
		if (playerWeapon == "paper" && computerWeapon == "rock") {
			decider = "You Won";
			// console.log(playerWeapon)
		} else if (playerWeapon == "paper" && computerWeapon == "scissors") {
			decider = "You Lost";
		}
	}

	if (playerWeapon == "scissors") {
		if (playerWeapon == "scissors" && computerWeapon == "paper") {
			decider = "You Won";
		} else if (playerWeapon == "scissors" && computerWeapon == "rock") {
			decider = "You Lost";
		}
	}

	// console.log(decider)
	deciderText.textContent = decider;

	function scoreUpdate(decider) {
		switch (decider) {
			case "You Won":
				score += 1;
				break;
			case "You Lost":
				score = score - 1;
				break;
			case "Draw":
				score += 0;
				break;
        }
        localStorage.setItem(setScore,score)
        // console.log(score);
        // console.log(localStorage.getItem(setScore))

		scoreText.textContent = localStorage.getItem(setScore);
	}
	scoreUpdate(decider);
}

function playAgain() {
	const playAgainBtn = document.querySelector(".playagain");

	playAgainBtn.addEventListener("click", function (e) {
		weaponsContainer.style.display = "flex";
		// console.log(weaponsContainer)
		showChosenSection.style.display = "none";
		showChosenSection.innerHTML = "";
		roundStatus.style.display = "none";
		selectedText.style.display = "none";
	});
}

// Opening Rules modal 

function showModal(){
	modalContainer.style.display ="flex"; 
}

// Close Modal 

function closeModal() {
	modalContainer.style.display = "none"
}
