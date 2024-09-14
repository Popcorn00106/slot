using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace SlotMachineApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SpinController : ControllerBase
    {
        private static readonly string[] Symbols = { "🎃", "🌱", "🌻" };

        [HttpGet]
        public IActionResult Get(int bet, string question)
        {
            if (bet < 1 || bet > 100)
            {
                return BadRequest("Invalid bet amount.");
            }

            var result = SpinReels();
            var payout = CalculatePayout(result);
            var diceRoll = RollDice(question);
            var freeSpins = (diceRoll % 2 == 0) ? diceRoll : 0;

            // Calculate new bank amount (assuming starting bank is 100)
            int bankAmount = 100 + payout - bet;

            return Ok(new
            {
                Result = result,
                Payout = payout,
                BankAmount = bankAmount,
                FreeSpins = freeSpins,
                DiceRoll = diceRoll,
                Question = GetQuestionText(question)
            });
        }

        private string[,] SpinReels()
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

        private int CalculatePayout(string[,] result)
        {
            int payout = 0;
            var flatPayouts = new Dictionary<string, int>
            {
                { "🎃🎃🎃", 100 },
                { "🌱🌱🌱", 60 },
                { "🌻🌻🌻", 150 },
                { "🎃🎃🎃🎃", 200 },
                { "🌱🌱🌱🌻", 300 },
                { "🌻🌻🌻🌻", 320 },
                { "🎃🎃🎃🎃🎃", 350 },
                { "🎃🎃🎃🎃🎃🎃", 500 }
            };

            string rowStr;
            for (int i = 0; i < 5; i++)
            {
                rowStr = $"{result[i, 0]}{result[i, 1]}{result[i, 2]}";
                if (flatPayouts.ContainsKey(rowStr))
                {
                    payout += flatPayouts[rowStr];
                }
            }

            return payout;
        }

        private int RollDice(string question)
        {
            Random rand = new Random();
            int sides = GetDiceSides(question);
            return rand.Next(1, sides + 1);
        }

        private int GetDiceSides(string question)
        {
            // Simple example: different questions may map to different dice sides
            switch (question)
            {
                case "Q1": return 6;
                case "Q2": return 12;
                case "Q3": return 32;
                default: return 6;
            }
        }

        private string GetQuestionText(string questionId)
        {
            var questions = new Dictionary<string, string>
            {
                { "Q1", "On a sunny day, you find a pumpkin plant with a single ripe pumpkin. Do you..." },
                { "Q2", "While tending your pumpkin patch, you spot a bug on one of your pumpkins. Do you..." },
                { "Q3", "Your friend offers you a unique pumpkin seed. Do you..." },
                { "Q4", "You see a pumpkin festival in town. Do you..." },
                { "Q5", "A neighbor asks for help with their pumpkin harvest. Do you..." },
                { "Q6", "You discover a mysterious pumpkin in your garden. Do you..." },
                { "Q7", "Your family asks if you want to make pumpkin pie or pumpkin soup. Do you..." },
                { "Q8", "You find a rare pumpkin variety at the market. Do you..." },
                { "Q9", "Your pumpkin patch is overrun with weeds. Do you..." },
                { "Q10", "A stranger offers you a special pumpkin fertilizer. Do you..." }
            };

            return questions.ContainsKey(questionId) ? questions[questionId] : "No question selected.";
        }
    }
}
