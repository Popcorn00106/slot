const symbols = ["Cherry", "Lemon", "Orange"];

function spinReels() {
    let result = [];
    for (let i = 0; i < 5; i++) {
        result.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }

    document.getElementById('reel1').textContent = result[0];
    document.getElementById('reel2').textContent = result[1];
    document.getElementById('reel3').textContent = result[2];
    document.getElementById('reel4').textContent = result[3];
    document.getElementById('reel5').textContent = result[4];

    let payout = calculatePayout(result);
    document.getElementById('payout').textContent = `Payout: ${payout} cents`;
}

function calculatePayout(result) {
    // Example payout calculation
    if (result[0] === result[1] && result[1] === result[2]) {
        return 10; // Example payout
    }
    return 0;
}
