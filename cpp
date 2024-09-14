#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>

const int NUM_REELS = 5;
const int NUM_SYMBOLS = 3; // e.g., 0 - Cherry, 1 - Lemon, 2 - Orange

std::vector<std::string> symbols = {"Cherry", "Lemon", "Orange"};

void spinReels(int reels[NUM_REELS]) {
    for (int i = 0; i < NUM_REELS; ++i) {
        reels[i] = rand() % NUM_SYMBOLS;
    }
}

void displayReels(int reels[NUM_REELS]) {
    for (int i = 0; i < NUM_REELS; ++i) {
        std::cout << symbols[reels[i]] << " ";
    }
    std::cout << std::endl;
}

int calculatePayout(int reels[NUM_REELS]) {
    // Example payout calculation (could be more complex)
    int payout = 0;
    if (reels[0] == reels[1] && reels[1] == reels[2]) {
        payout = 10; // Example payout
    }
    return payout;
}

int main() {
    srand(static_cast<unsigned>(time(0)));
    
    int reels[NUM_REELS];
    
    spinReels(reels);
    displayReels(reels);
    
    int payout = calculatePayout(reels);
    std::cout << "Payout: " << payout << " cents" << std::endl;
    
    return 0;
}
