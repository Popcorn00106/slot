using System;
using System.Collections.Generic;

public class SlotMachineGame
{
    private static readonly string[] Symbols = { "🎃", "🌱", "🌻" };
    
    public static void Main()
    {
        // Example of spinning the reels
        string[,] reels = SpinReels();
        
        // Print results (for debugging purposes)
        for (int i = 0; i < 5; i++)
        {
            for (int j = 0; j < 3; j++)
            {
                Console.Write(reels[i, j] + " ");
            }
            Console.WriteLine();
        }
    }
    
    private static string[,] SpinReels()
    {
        Random rand = new Random();
        string[,] reels = new string[5, 3];
        
        for (int i = 0; i < 5; i++)
        {
            for (int j = 0; j < 3; j++)
            {
                reels[i, j] = Symbols[rand.Next(Symbols.Length)];
            }
        }
        
        return reels;
    }
}
