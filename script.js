const symbols = ["C", "L", "O"]; // Cherry, Lemon, Orange
let bankAmount = 100;

function spinReels() {
    let result = [];
    const bet = parseInt(document.getElementById('bet').value);

    if (bet < 1 || bet > 100) {
        alert('Please enter a bet between 1 and 100 cents.');
        return;
    }

    if (bet > bankAmount) {
        alert('Insufficient funds.');
        return;
    }

    for (let i = 0; i < 5; i++) {
        result.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }

    document.getElementById('reel1').textContent = result[0];
    document.getElementById('reel2').textContent = result[1];
    document.getElementById('reel3').textContent = result[2];
    document.getElementById('reel4').textContent = result[3];
    document.getElementById('reel5').textContent = result[4];

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
