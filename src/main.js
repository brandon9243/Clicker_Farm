/* All cost and purchase amounts */
let score = 0;
let fishermenCost = 20;
let fishermenPurchased = 0;
let fishNetCost = 50;
let fishNetPurchased = 0;
let fishCorpCost = 100;
let fishCorpPurchased = 0;

/* on click it'll do these functions and update everytime */
function updateButtons() {
    document.getElementById('fishermen').disabled = true;
    document.getElementById('fishNet').disabled = true;
    document.getElementById('fishCorp').disabled = true;

    if (score >= fishermenCost) {
        document.getElementById('fishermen').disabled = false;
    }
    if (score >= fishNetCost) {
        document.getElementById('fishNet').disabled = false;
    }
    if (score >= fishCorpCost) {
        document.getElementById('fishCorp').disabled = false;
    }

    document.getElementById(
        'fishermen'
    ).innerText = `Buy Fishermen - Cost: ${fishermenCost}, Purchased: ${fishermenPurchased}
    1 Fish every 3 seconds`;
    document.getElementById(
        'fishNet'
    ).innerText = `Buy Fishing Net Crew - Cost: ${fishNetCost}, Purchased: ${fishNetPurchased}
    20 Fish every 10 seconds`;
    document.getElementById(
        'fishCorp'
    ).innerText = `Buy Fishermen Corporation - Cost: ${fishCorpCost}, Purchased: ${fishCorpPurchased}
    50 Fish every 15 seconds`;
}

const clickSound = new Audio('styles/sound/splash.wav');
const purchaseSound = new Audio('styles/sound/cash.mp3');

const achievementThresholds = {
    100: "Congratulations! You've reached 100 score!",
    500: "Amazing! You've reached 500 score!",
    1000: "Incredible! You've reached 1000 score!",
    1000000: "You've taken over the industry of fishing!",
};

// Set to store achieved milestones
const achievedMilestones = new Set();

// Function to check for achievements
function checkAchievements(score) {
    for (const threshold in achievementThresholds) {
        if (
            score >= parseInt(threshold) &&
            !achievedMilestones.has(threshold)
        ) {
            // Display achievement message
            alert(achievementThresholds[threshold]);
            achievedMilestones.add(threshold); // Add the milestone to the achieved set
            // You can also use a modal or other UI element to display the achievement message
        }
    }
}

/* on click add score as well as update game and button conditions */
document.getElementById('clicker').addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();
    score++;
    updateGame();
    updateButtons();
    checkAchievements(score);
});

/* on click buy the next clicker which is the fisherman, also has a price increase */
document.getElementById('fishermen').addEventListener('click', () => {
    purchaseSound.currentTime = 0;
    purchaseSound.play();
    if (score >= fishermenCost) {
        score -= fishermenCost;
        fishermenPurchased++;
        fishermenCost = Math.ceil(fishermenCost * 1.15);
        updateGame();
        updateButtons();
        startfishermen();
    }
});

/* on click buy fishing net crew which autoclicks even more fish, also has a price increase */
document.getElementById('fishNet').addEventListener('click', () => {
    purchaseSound.currentTime = 0;
    purchaseSound.play();
    if (score >= fishNetCost) {
        score -= fishNetCost;
        fishNetPurchased++;
        fishNetCost = Math.ceil(fishNetCost * 1.15);
        updateGame();
        updateButtons();
        startFishNet();
    }
});

/* on click buy fisherman corporation which earns you a lot of fish every so often also increases pricing */
document.getElementById('fishCorp').addEventListener('click', () => {
    purchaseSound.currentTime = 0;
    purchaseSound.play();
    if (score >= fishCorpCost) {
        score -= fishCorpCost;
        fishCorpPurchased++;
        fishCorpCost = Math.ceil(fishCorpCost * 1.15);
        updateGame();
        updateButtons();
        startfishCorp();
    }
});

/* all these are time intervals for the auto clickers which change depending on each one */
function startfishermen() {
    setInterval(() => {
        score += fishermenPurchased;
        updateGame();
    }, 3000);
}

function startFishNet() {
    setInterval(() => {
        score += 20 * fishNetPurchased;
        updateGame();
    }, 10000);
}

function startfishCorp() {
    setInterval(() => {
        score += 50 * fishCorpPurchased;
        updateGame();
    }, 15000);
}

/* update the game constantly */
function updateGame() {
    const building = new Building(
        score,
        fishermenCost,
        fishermenPurchased,
        fishNetCost,
        fishNetPurchased,
        fishCorpCost,
        fishCorpPurchased
    );
    building.update();
    updateButtons();
}
