using System;
using System.Net.Http;
using System.Threading.Tasks;

public class SlotMachineClient
{
    private static readonly HttpClient client = new HttpClient();

    public static async Task Main()
    {
        Console.WriteLine("Welcome to the Pumpkin Slot Machine!");
        
        // Example of spinning the reels
        await SpinReelsAsync();
    }

    private static async Task SpinReelsAsync()
    {
        Console.Write("Enter your bet (cents): ");
        var bet = Console.ReadLine();

        // Call the web server to handle the spin
        var response = await client.GetStringAsync($"https://your-web-server.com/api/spin?bet={bet}");
        
        Console.WriteLine($"Server Response: {response}");
    }
}
