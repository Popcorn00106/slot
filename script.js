const symbols = ["C", "L", "O"]; // Cherry, Lemon, Orange
let bankAmount = 100;

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
    document.getElementById('reel1').textContent = result[0];
    document.getElementById('reel2').textContent = result[1];
    document.getElementById('reel3').textContent = result[2];
    document.getElementById('reel4').textContent = result[3];
    document.getElementById('reel5').textContent = result[4];

    // Calculate payout and update bank
    let payout = calculatePayout(result);
    bankAmount += payout - bet;
    document.getElementById('bankAmount').textContent = bankAmount;
    document.getElementById('payout').textContent = `Payout: ${payout} cents`;
}

function calculatePayout(result) {
    // Example payout calculation: all symbols match
    if (result.every(symbol => symbol === result[0])) {
        return 10; // Example payout
    }
    return 0;
}

// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button').addEventListener('click', spinReels);
});
