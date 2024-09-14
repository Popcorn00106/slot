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
        public IActionResult Get(int bet)
        {
            if (bet < 1 || bet > 100)
            {
                return BadRequest("Invalid bet amount.");
            }

            // Simulate spinning the reels
            var result = SpinReels();
            var payout = CalculatePayout(result);

            // Calculate new bank amount (assuming starting bank is 100)
            int bankAmount = 100 + payout - bet;

            return Ok(new
            {
                Result = result,
                Payout = payout,
                BankAmount = bankAmount
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
    }
}
