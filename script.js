const symbols = ["$", "?", "7"]; // Dollar, Question Mark, Seven
let bankAmount = 100;
let freeSpins = 0;
let freeSpinMode = false;
let previousQuestionEffects = {}; // Store effects of previous questions
let currentQuestion = 1; // Track current question

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

// Define questions and answers
const questions = {
    1: {
        question: "On a clear day, you find a strange animal with its leg trapped. What do you do?",
        answers: {
            A: "End its suffering quickly.",
            B: "Put it to sleep using herbs.",
            C: "Observe it and learn more about the animal."
        }
    },
    2: {
        question: "Your father offers you a choice of chores. What do you choose?",
        answers: {
            A: "Work in the forge with him.",
            B: "Gather herbs for dinner.",
            C: "Catch fish at the stream."
        }
    },
    3: {
        question: "Your cousin gives you an embarrassing nickname. How do you respond?",
        answers: {
            A: "Beat him and threaten him.",
            B: "Make the nickname a badge of honor.",
            C: "Create an even more embarrassing nickname for him."
        }
    },
    4: {
        question: "There is a debate about 'Telepaths'. What is your view?",
        answers: {
            A: "It's a terrible practice.",
            B: "Loyal followers have nothing to fear.",
            C: "It has certain advantages in times of war."
        }
    },
    5: {
        question: "You receive too much change at the market. What do you do?",
        answers: {
            A: "Return the extra money to the shopkeeper.",
            B: "Use the extra money for your family.",
            C: "Keep the extra money."
        }
    },
    6: {
        question: "You witness a thief drop a purse. What do you do?",
        answers: {
            A: "Return the money to the noble.",
            B: "Leave it and avoid involvement.",
            C: "Keep the money for yourself."
        }
    },
    7: {
        question: "Your friend offers to clean the stables for you. What do you do?",
        answers: {
            A: "Decline and do the work yourself.",
            B: "Accept the help and agree to a future favor.",
            C: "Accept the offer and let him do the work."
        }
    },
    8: {
        question: "While fixing the stove, a hot pipe falls towards your mother. What do you do?",
        answers: {
            A: "Position yourself between the pipe and your mother.",
            B: "Grab the pipe and push it away.",
            C: "Push your mother out of the way."
        }
    },
    9: {
        question: "A gang of kids demands your sweetroll. What do you do?",
        answers: {
            A: "Drop and step on the sweetroll, preparing for a fight.",
            B: "Give them the sweetroll and plan to get it back later.",
            C: "Throw the sweetroll and then attack."
        }
    },
    10: {
        question: "A well-dressed man asks for help from an angry crowd. What do you do?",
        answers: {
            A: "Rush to aid him despite the risks.",
            B: "Step aside and let them pass.",
            C: "Rush to help him without knowing the situation."
        }
    }
};

// Generate random effects for question answers
function generateRandomEffects() {
    let effects = {};
    for (let q in questions) {
        effects[q] = {};
        let options = Object.keys(questions[q].answers);
        options.forEach(option => {
            effects[q][option] = Math.floor(Math.random() * 3) - 1; // Random effect -1, 0, or 1
        });
    }
    return effects;
}

// Randomly update effects at the start of each round
function updateQuestionEffects() {
    previousQuestionEffects = generateRandomEffects();
}

// Simulate dice roll with weighted effects
function rollDice(answer) {
    let effect = previousQuestionEffects[currentQuestion][answer] || 0;
    let baseRoll = Math.floor(Math.random() * 6) + 1; // Dice with 6 sides
    let adjustedRoll = baseRoll + effect;
    return Math.max(1, Math.min(6, adjustedRoll)); // Ensure roll is between 1 and 6
}

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

    // Free spins mode
    if (freeSpinMode) {
        freeSpinMode = false; // Exit free spin mode
        for (let i = 0; i < freeSpins; i++) {
            setTimeout(() => {
                for (let j = 0; j < 8; j++) { // Update for 8 rows
                    let row = [];
                    for (let k = 0; k < 5; k++) {
                        row.push(symbols[Math.floor(Math.random() * symbols.length)]);
                    }
                    result.push(row);
                }
                updateReels(result);
                let payout = calculatePayout(result);
                bankAmount += payout - bet;
                document.getElementById('bankAmount').textContent = bankAmount;
                document.getElementById('payout').textContent = `Payout: ${payout} cents`;
            }, i * 2000);
        }
        freeSpins = 0; // Reset free spins count
        return;
    }

    // Generate random results for each row
    result = [];
    for (let i = 0; i < 8; i++) { // Update for 8 rows
        let row = [];
        for (let j = 0; j < 5; j++) {
            row.push(symbols[Math.floor(Math.random() * symbols.length)]);
        }
        result.push(row);
    }

    // Update the reels display
    updateReels(result);

    // Calculate payout and update bank
    let payout = calculatePayout(result);
    bankAmount += payout - bet;
    document.getElementById('bankAmount').textContent = bankAmount;
    document.getElementById('payout').textContent = `Payout: ${payout} cents`;

    // Check for free spin bonus
    checkForFreeSpin(result);

    // Change background color if jackpot is hit
    if (payout > 0) {
        document.body.style.backgroundColor = payout >= 500 ? "yellow" : "#f0f0f0"; // Change color for jackpots
        setTimeout(() => {
            document.body.style.backgroundColor = "#f0f0f0"; // Reset color after a few seconds
        }, 2000);
    }
}

function updateReels(result) {
    for (let i = 0; i < 8; i++) { // Update for 8 rows
        for (let j = 0; j < 5; j++) {
            let reel = document.getElementById(`reel${i * 5 + j + 1}`);
            reel.textContent = result[i][j];
            reel.style.backgroundColor = colors[result[i][j]];
        }
    }
}

function calculatePayout(result) {
    let payout = 0;

    // Check for combinations from right to left
    for (let i = 0; i < 8; i++) { // For each row
        let row = result[i].join('');
        for (let len = 5; len >= 2; len--) { // Check for lengths from 5 to 2
            for (let start = 0; start <= 5 - len; start++) {
                let combination = row.slice(start, start + len);
                if (payouts[combination]) {
                    payout += payouts[combination];
                }
            }
        }
    }

    return payout;
}

function checkForFreeSpin(result) {
    const patterns = {
        "$$$$": 3,
        "????": 3,
        "7777": 3,
        "$$$?": 2,
        "?????": 2
    };

    for (const pattern in patterns) {
        for (let i = 0; i < 8; i++) {
            const row = result[i].join('');
            if (row.includes(pattern)) {
                freeSpins = patterns[pattern];
                freeSpinMode = true;
                document.getElementById('payout').textContent += ` Free Spins: ${freeSpins}`;
                break;
            }
        }
    }
}

function askQuestion() {
    const q = questions[currentQuestion];
    let answer = prompt(`${q.question}\n\nA: ${q.answers.A}\nB: ${q.answers.B}\nC: ${q.answers.C}`);
    
    if (answer && ['A', 'B', 'C'].includes(answer.toUpperCase())) {
        currentQuestion = (currentQuestion % 10) + 1; // Move to the next question, loop back after 10
        let diceRoll = rollDice(answer.toUpperCase());
        alert(`Your answer '${answer}' resulted in a dice roll of ${diceRoll}.`);
    } else {
        alert('Invalid answer. Please choose A, B, or C.');
        askQuestion(); // Re-prompt if answer is invalid
    }
}

// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button').addEventListener('click', () => {
        askQuestion(); // Ask question before spinning
        spinReels();
    });
    updateQuestionEffects(); // Initialize random effects
});
