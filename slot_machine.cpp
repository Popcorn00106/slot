#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
#include <iomanip>
#include <unordered_map>
#include <algorithm>

// Define symbols and payouts
const std::vector<std::string> symbols = {"$", "?", "7"};
std::unordered_map<std::string, int> payouts = {
    {"$$", 20}, {"$?", 10}, {"$7", 15}, {"??", 25},
    {"?7", 5}, {"77", 30}, {"$$$", 100}, {"???", 60},
    {"777", 150}, {"$$$$", 200}, {"$$$?", 180}, {"$$$7", 220},
    {"$$$?7", 250}, {"????", 300}, {"???7", 270}, {"??77", 320},
    {"7777", 350}, {"$$$$$", 500}, {"$$$$?$?7", 600},
    {"$$$$$$", 700}, {"$$$$$$7", 800}, {"$$$$$$?7", 900},
    {"77777", 1200}
};

// Function to simulate a spin
std::vector<std::vector<std::string>> spinReels() {
    std::vector<std::vector<std::string>> reels(8, std::vector<std::string>(5));
    for (auto& row : reels) {
        for (auto& slot : row) {
            slot = symbols[rand() % symbols.size()];
        }
    }
    return reels;
}

// Function to calculate payout
int calculatePayout(const std::vector<std::vector<std::string>>& reels) {
    int payout = 0;

    for (const auto& row : reels) {
        std::string rowStr(row.begin(), row.end());

        // Check for combinations of different lengths
        for (size_t len = 5; len >= 2; --len) {
            for (size_t start = 0; start <= 5 - len; ++start) {
                std::string combination = rowStr.substr(start, len);
                if (payouts.find(combination) != payouts.end()) {
                    payout += payouts[combination];
                }
            }
        }
    }

    return payout;
}

// Function to display reels
void displayReels(const std::vector<std::vector<std::string>>& reels) {
    for (const auto& row : reels) {
        for (const auto& slot : row) {
            std::cout << std::setw(4) << slot;
        }
        std::cout << std::endl;
    }
}

// Main function
int main() {
    std::srand(static_cast<unsigned int>(std::time(0)));
    int bankAmount = 100;
    int bet;

    while (true) {
        std::cout << "Current Bank Amount: $" << bankAmount / 100.0 << std::endl;
        std::cout << "Enter your bet (1-100 cents): ";
        std::cin >> bet;

        if (bet < 1 || bet > 100) {
            std::cout << "Invalid bet amount. Please enter a value between 1 and 100 cents." << std::endl;
            continue;
        }

        if (bet > bankAmount) {
            std::cout << "Insufficient funds. Please enter a lower bet." << std::endl;
            continue;
        }

        // Spin the reels
        std::vector<std::vector<std::string>> reels = spinReels();

        // Display the result
        std::cout << "\nSpinning...\n";
        displayReels(reels);

        // Calculate payout
        int payout = calculatePayout(reels);
        bankAmount += payout - bet;
        std::cout << "Payout: $" << payout / 100.0 << std::endl;
        std::cout << "Updated Bank Amount: $" << bankAmount / 100.0 << std::endl;

        // Check if player has enough funds to continue
        if (bankAmount <= 0) {
            std::cout << "Game over. You've run out of funds." << std::endl;
            break;
        }

        char playAgain;
        std::cout << "Do you want to play again? (y/n): ";
        std::cin >> playAgain;
        if (playAgain != 'y' && playAgain != 'Y') {
            break;
        }
    }

    return 0;
}
