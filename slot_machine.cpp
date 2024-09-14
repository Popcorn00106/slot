#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>

// Define the symbols
enum Symbol { PUMPKIN, SPROUT, FLOWER };

// Function to get a random symbol
Symbol getRandomSymbol() {
    return static_cast<Symbol>(rand() % 3);
}

// Function to simulate a spin
std::vector<std::vector<Symbol>> spinReels() {
    std::vector<std::vector<Symbol>> reels(5, std::vector<Symbol>(3));
    for (int i = 0; i < 5; ++i) {
        for (int j = 0; j < 3; ++j) {
            reels[i][j] = getRandomSymbol();
        }
    }
    return reels;
}

// Main function
int main() {
    srand(static_cast<unsigned>(time(0)));
    
    // Simulate a spin
    std::vector<std::vector<Symbol>> result = spinReels();
    
    // Output results (for debugging purposes)
    for (const auto& reel : result) {
        for (const auto& symbol : reel) {
            switch (symbol) {
                case PUMPKIN: std::cout << "🎃 "; break;
                case SPROUT: std::cout << "🌱 "; break;
                case FLOWER: std::cout << "🌻 "; break;
            }
        }
        std::cout << std::endl;
    }
    
    return 0;
}
