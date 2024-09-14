using System;
using System.Collections.Generic;
using System.Linq;

class SlotMachine
{
    static readonly string[] Symbols = { "$", "?", "7" };
    static readonly Dictionary<string, int> Payouts = new()
    {
        { "$$", 20 }, { "$?", 10 }, { "$7", 15 }, { "??", 25 },
        { "?7", 5 }, { "77", 30 }, { "$$$", 100 }, { "???", 60 },
        { "777", 150 }, { "$$$$", 200 }, { "$$$?", 180 }, { "$$$7", 220 },
        { "$$$?7", 250 }, { "????", 300 }, { "???7", 270 }, { "??77", 320 },
        { "7777", 350 }, { "$$$$$", 500 }, { "$$$$$?$?7", 600 },
        { "$$$$$$", 700 }, { "$$$$$$7", 800 }, { "$$$$$$?7", 900 },
        { "77777", 1200 }
    };
    static readonly Dictionary<string, int> FreeSpinPatterns = new()
    {
        { "$$$$", 3 },
        { "????", 3 },
        { "7777", 3 },
        { "$$$?", 2 },
        { "?????", 2 }
    };

    static Random random = new();
    static int bankAmount = 100;
    static int freeSpins = 0;
    static bool freeSpinMode = false;

    static void Main()
    {
        Console.WriteLine("Welcome to the Slot Machine Game!");

        while (true)
        {
            Console.WriteLine($"Current Bank Amount: ${bankAmount / 100.0:F2}");
            Console.Write("Enter your bet (1-100 cents): ");
            if (!int.TryParse(Console.ReadLine(), out int bet) || bet < 1 || bet > 100)
            {
                Console.WriteLine("Invalid bet amount. Please enter a value between 1 and 100 cents.");
                continue;
            }

            if (bet > bankAmount)
            {
                Console.WriteLine("Insufficient funds. Please enter a lower bet.");
                continue;
            }

            var reels = SpinReels();
            DisplayReels(reels);

            int payout = CalculatePayout(reels);
            bankAmount += payout - bet;

            Console.WriteLine($"Payout: ${payout / 100.0:F2}");
            Console.WriteLine($"Updated Bank Amount: ${bankAmount / 100.0:F2}");

            if (freeSpinMode)
            {
                Console.WriteLine($"You have {freeSpins} free spins remaining.");
                freeSpins--;
                if (freeSpins <= 0)
                {
                    freeSpinMode = false;
                }
            }

            if (bankAmount <= 0)
            {
                Console.WriteLine("Game over. You've run out of funds.");
                break;
            }

            Console.Write("Do you want to play again? (y/n): ");
            if (Console.ReadLine()?.ToLower() != "y")
            {
                break;
            }
        }
    }

    static string[,] SpinReels()
    {
        var reels = new string[8, 5];
        for (int i = 0; i < 8; i++)
        {
            for (int j = 0; j < 5; j++)
            {
                reels[i, j] = Symbols[random.Next(Symbols.Length)];
            }
        }
        return reels;
    }

    static void DisplayReels(string[,] reels)
    {
        for (int i = 0; i < 8; i++)
        {
            for (int j = 0; j < 5; j++)
            {
                Console.Write($"{reels[i, j],4} ");
            }
            Console.WriteLine();
        }
    }

    static int CalculatePayout(string[,] reels)
    {
        int payout = 0;
        for (int i = 0; i < 8; i++)
        {
            string row = string.Join("", Enumerable.Range(0, 5).Select(j => reels[i, j]));
            payout += CalculateRowPayout(row);
        }

        CheckForFreeSpin(reels);
        return payout;
    }

    static int CalculateRowPayout(string row)
    {
        int payout = 0;
        for (int len = 5; len >= 2; len--)
        {
            for (int start = 0; start <= 5 - len; start++)
            {
                string combination = row.Substring(start, len);
                if (Payouts.ContainsKey(combination))
                {
                    payout += Payouts[combination];
                }
            }
        }
        return payout;
    }

    static void CheckForFreeSpin(string[,] reels)
    {
        foreach (var pattern in FreeSpinPatterns)
        {
            string patternStr = new string(pattern.Key.Select(c => c).ToArray());
            for (int i = 0; i < 8; i++)
            {
                string row = string.Join("", Enumerable.Range(0, 5).Select(j => reels[i, j]));
                if (row.Contains(patternStr))
                {
                    freeSpins = pattern.Value;
                    freeSpinMode = true;
                    Console.WriteLine($"Free Spins Activated! You get {freeSpins} free spins.");
                    return;
                }
            }
        }
    }
}
