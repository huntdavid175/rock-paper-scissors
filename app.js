const weaponsContainer = document.querySelector(".choose");
const weapons = document.querySelectorAll(".image-bg");
const selectedText = document.querySelector(".selected-text");
const roundStatus = document.querySelector(".round-status");
const scoreText = document.querySelector(".current-score");
const modalContainer = document.querySelector(".modal-container");
const closeModalButton = document.querySelector(".close-button");
const highScoreModal = document.querySelector(".high-score-modal");
const highScoreText = highScoreModal.children[1];
let score = 0;
let scoresArray = [];

let playerSelectedDiv;
let computerChoiceDiv;
let playerWeapon;
let computerWeapon;
const showChosenSection = document.querySelector(".chosen");

weaponsContainer.addEventListener("click", function (e) {
	if (e.target.className == "image-bg" || e.target.tagName == "IMG") {
		weaponsContainer.style.display = "none";
		let divTarget;
		let imageTarget;

		if (e.target.className == "image-bg") {
			divTarget = e.target;
			playerSelectedDiv = divTarget.cloneNode(true);
			showChosenSection.appendChild(playerSelectedDiv);
			showChosenSection.style.display = "flex";
			selectedText.style.display = "flex";
		} else if (e.target.tagName == "IMG") {
			imageTarget = e.target;
			playerSelectedDiv = imageTarget.parentNode.cloneNode(true);
			showChosenSection.appendChild(playerSelectedDiv);
			showChosenSection.style.display = "flex";
			selectedText.style.display = "flex";
		}
		setTimeout(function () {
			computerSelection();
			getPlayersWeapon();
			decideWinner(playerWeapon, computerWeapon);
			playAgain();
		}, 1000);
	}
});

// Getting Computer's Choice

function computerSelection() {
	let random = Math.floor(Math.random() * 3);
	computerChoiceDiv = weaponsContainer.children[random].cloneNode(true);
	showChosenSection.appendChild(computerChoiceDiv);
	roundStatus.style.display = "block";
}

// Get player and computer Weapon
function getPlayersWeapon() {
	playerWeapon = playerSelectedDiv.getAttribute("id");

	computerWeapon = computerChoiceDiv.getAttribute("id");
}

// Decide round winner

function decideWinner(playerWeapon, computerWeapon) {
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

		scoreText.textContent = score;
	}
	scoreUpdate(decider);
}

function playAgain() {
	const playAgainBtn = document.querySelector(".playagain");

	playAgainBtn.addEventListener("click", function (e) {
		weaponsContainer.style.display = "flex";
		showChosenSection.style.display = "none";
		showChosenSection.innerHTML = "";
		roundStatus.style.display = "none";
		selectedText.style.display = "none";
	});
}

// Opening Rules modal

function showModal() {
	modalContainer.style.display = "flex";
	highScoreModal.style.display = "none";
	modal.style.display = "flex";
}

// Close Modal

function closeModal() {
	modalContainer.style.display = "none";
}

// New Game

if (!localStorage.getItem("gamescores")) {
	localStorage.setItem("gamescores", JSON.stringify(scoresArray));
}
function newGame() {
	let forLocal = JSON.parse(localStorage.getItem("gamescores"));
	if (forLocal.indexOf(score) == -1) {
		forLocal.push(score);
	}

	localStorage.setItem("gamescores", JSON.stringify(forLocal));

	score = 0;
	scoreText.textContent = score;
	showChosenSection.style.display = "none";
	showChosenSection.innerHTML = "";
	roundStatus.style.display = "none";
	selectedText.style.display = "none";
	weaponsContainer.style.display = "flex";
}

// Show High Scores
const modal = document.querySelector(".modal");
function showHighscore() {
	let forHighScore = localStorage.getItem("gamescores");
	forHighScore = JSON.parse(forHighScore);
	let highScore = Math.max(...forHighScore);

	highScoreText.innerHTML = highScore;
	modalContainer.style.display = "flex";
	highScoreModal.style.display = "flex";
	modal.style.display = "none";
}
