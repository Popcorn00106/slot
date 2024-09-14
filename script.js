const symbols = ["$", "?", "7"]; // Dollar, Question Mark, Seven
let bankAmount = 100;

// Define payouts for combinations
const payouts = {
    "$$": 20,
    "$?": 10,
    "$7": 15,
    "??": 25,
    "?7": 5,
    "77": 30,
    "$$$": 100,
    "???": 60,
    "777": 150,
    "$$$$": 200,
    "$$$?": 180,
    "$$$7": 220,
    "$$$?7": 250,
    "????": 300,
    "???7": 270,
    "??77": 320,
    "7777": 350,
    "$$$$$": 500,
    "$$$$$?": 600,
    "$$$$$7": 700,
    "$$$$$?7": 800,
    "?????": 900,
    "?????7": 1000,
    "77777": 1200
};

// Define colors for each symbol
const colors = {
    "$": "gold",
    "?": "lightblue",
    "7": "red"
};

function spinReels() {
    let result = [];
    const bet = parseInt(document.getElementById('bet').value, 10);

    // Input validation
    if (isNaN(bet) || bet < 1 || bet > 100) {
        alert('Please enter a valid bet between 1 and 100 cents.');
        return;
    }

    if (bet > bankAmount) {
        alert('Insufficient funds.');
        return;
    }

    // Generate random results for each reel
    for (let i = 0; i < 5; i++) {
        result.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }

    // Update the reels display
    for (let i = 0; i < 5; i++) {
        let reel = document.getElementById(`reel${i + 1}`);
        reel.textContent = result[i];
        reel.style.backgroundColor = colors[result[i]];
    }

    // Calculate payout and update bank
    let payout = calculatePayout(result);
    bankAmount += payout - bet;
    document.getElementById('bankAmount').textContent = bankAmount;
    document.getElementById('payout').textContent = `Payout: ${payout} cents`;

    // Change background color if jackpot is hit
    if (payout > 0) {
        document.body.style.backgroundColor = payout >= 500 ? "yellow" : "#f0f0f0"; // Change color for jackpots
        setTimeout(() => {
            document.body.style.backgroundColor = "#f0f0f0"; // Reset color after a few seconds
        }, 2000);
    }
}

function calculatePayout(result) {
    let payout = 0;

    // Check for combinations of 5 symbols
    let fiveSymbols = result.join('');
    if (payouts[fiveSymbols]) {
        return payouts[fiveSymbols];
    }

    // Check for combinations of 4 symbols
    let fourSymbols = result.join('');
    if (payouts[fourSymbols]) {
        return payouts[fourSymbols];
    }

    // Check for combinations of 3 symbols
    let threeSymbols = result.join('');
    if (payouts[threeSymbols]) {
        payout = payouts[threeSymbols];
    }

    // Check for combinations of 2 symbols
    for (let i = 0; i < result.length - 1; i++) {
        let twoSymbols = result[i] + result[i + 1];
        if (payouts[twoSymbols]) {
            payout = Math.max(payout, payouts[twoSymbols]);
        }
    }

    return payout;
}

// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button').addEventListener('click', spinReels);
});
