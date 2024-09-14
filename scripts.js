const symbols = ["🎃", "🌱", "🌻"];
let bankAmount = 100;
let freeSpins = 0;
let currentQuestion = '';

async function spinReels() {
    const bet = parseInt(document.getElementById('bet').value);

    if (bet < 1 || bet > 100) {
        alert('Please enter a bet between 1 and 100 cents.');
        return;
    }

    if (bet > bankAmount) {
        alert('Insufficient funds.');
        return;
    }

    const response = await fetch(`https://your-web-server.com/api/spin?bet=${bet}&question=${currentQuestion}`);
    const data = await response.json();

    const result = data.Result;
    const payout = data.Payout;
    bankAmount = data.BankAmount;
    freeSpins = data.FreeSpins;

    updateReels(result);
    document.getElementById('payout').textContent = `Payout: ${payout} cents`;
    document.getElementById('bankAmount').textContent = `Bank Amount: ${bankAmount} cents`;
    document.getElementById('freeSpins').textContent = `Free Spins Awarded: ${freeSpins}`;
    document.getElementById('diceRoll').textContent = `Dice Roll: ${data.DiceRoll}`;
    document.getElementById('question').textContent = `Question: ${data.Question}`;
}

function updateReels(result) {
    for (let i = 0; i < 5; i++) {
        document.getElementById(`reel${i + 1}`).textContent = result[i].join(' ');
    }
}

function selectQuestion(questionId) {
    currentQuestion = questionId;
    document.getElementById('question').textContent = `Question: ${getQuestionText(questionId)}`;
}

function getQuestionText(questionId) {
    const questions = {
        Q1: "On a sunny day, you find a pumpkin plant with a single ripe pumpkin. Do you...",
        Q2: "While tending your pumpkin patch, you spot a bug on one of your pumpkins. Do you...",
        Q3: "Your friend offers you a unique pumpkin seed. Do you...",
        Q4: "You see a pumpkin festival in town. Do you...",
        Q5: "A neighbor asks for help with their pumpkin harvest. Do you...",
        Q6: "You discover a mysterious pumpkin in your garden. Do you...",
        Q7: "Your family asks if you want to make pumpkin pie or pumpkin soup. Do you...",
        Q8: "You find a rare pumpkin variety at the market. Do you...",
        Q9: "Your pumpkin patch is overrun with weeds. Do you...",
        Q10: "A stranger offers you a special pumpkin fertilizer. Do you..."
    };
    return questions[questionId] || "No question selected.";
}
