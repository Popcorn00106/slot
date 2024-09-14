const symbols = ["🎃", "🌱", "🌻"]; // Pumpkin, Sprout, Flower
let bankAmount = 100;
let freeSpins = 0;
let freeSpinMode = false;

function spinReels(question) {
    const bet = parseInt(document.getElementById('bet').value);

    if (bet < 1 || bet > 100) {
        alert('Please enter a bet between 1 and 100 cents.');
        return;
    }

    if (bet > bankAmount) {
        alert('Insufficient funds.');
        return;
    }

    let result = [];
    for (let i = 0; i < 5; i++) {
        let reel = [];
        for (let j = 0; j < 3; j++) {
            reel.push(symbols[Math.floor(Math.random() * symbols.length)]);
        }
        result.push(reel);
    }

    updateReels(result);

    let payout = calculatePayout(result);
    bankAmount += payout - bet;
    document.getElementById('bankAmount').textContent = bankAmount;
    document.getElementById('payout').textContent = `Payout: ${payout} cents`;

    // Handle free spins
    if (freeSpinMode) {
        freeSpins--;
        if (freeSpins > 0) {
            document.getElementById('freeSpins').textContent = `Free Spins Remaining: ${freeSpins}`;
        } else {
            freeSpinMode = false;
            document.getElementById('freeSpins').textContent = '';
        }
    }

    // Update question impact
    updateQuestionImpact(question);
}

function updateReels(result) {
    for (let i = 0; i < 15; i++) {
        document.getElementById(`reel${i + 1}`).textContent = result[Math.floor(i / 3)][i % 3];
    }
}

function calculatePayout(result) {
    let payout = 0;
    let flatPayouts = {
        "🎃🎃🎃": 100,
        "🌱🌱🌱": 60,
        "🌻🌻🌻": 150,
        "🎃🎃🎃🎃": 200,
        "🌱🌱🌱🌻": 300,
        "🌻🌻🌻🌻": 320,
        "🎃🎃🎃🎃🎃": 350,
        "🎃🎃🎃🎃🎃🎃": 500,
        "🎃🎃🎃🎃🎃🎃🎃": 600
    };

    // Check for all combinations in the result
    for (let row of result) {
        let rowStr = row.join('');
        if (flatPayouts[rowStr]) {
            payout += flatPayouts[rowStr];
        }
    }

    return payout;
}

function updateQuestionImpact(question) {
    let diceSides = 6; // Default dice sides

    if (question === 'Q1') {
        diceSides = 6;
    } else if (question === 'Q2') {
        diceSides = 12;
    } else if (question === 'Q3') {
        diceSides = 32;
    }

    let diceRoll = Math.floor(Math.random() * diceSides) + 1;

    // Adjust free spin chances based on dice roll
    if (diceRoll === 1) {
        freeSpins += 1;
        freeSpinMode = true;
        document.getElementById('freeSpins').textContent = `Free Spins Awarded: ${freeSpins}`;
    } else if (diceRoll === 2) {
        freeSpins += 2;
        freeSpinMode = true;
        document.getElementById('freeSpins').textContent = `Free Spins Awarded: ${freeSpins}`;
    } else if (diceRoll === 3) {
        freeSpins += 3;
        freeSpinMode = true;
        document.getElementById('freeSpins').textContent = `Free Spins Awarded: ${freeSpins}`;
    }
}
