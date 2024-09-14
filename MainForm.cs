using System;
using System.Windows.Forms;

namespace SlotMachine
{
    public partial class MainForm : Form
    {
        Random rand = new Random();
        string[] symbols = { "Cherry", "Lemon", "Orange" };

        public MainForm()
        {
            InitializeComponent();
        }

        private void SpinButton_Click(object sender, EventArgs e)
        {
            string[] result = new string[5];
            for (int i = 0; i < 5; i++)
            {
                result[i] = symbols[rand.Next(symbols.Length)];
            }

            ReelsLabel.Text = string.Join(" ", result);

            int payout = CalculatePayout(result);
            PayoutLabel.Text = $"Payout: {payout} cents";
        }

        private int CalculatePayout(string[] result)
        {
            // Example payout calculation (could be more complex)
            if (result[0] == result[1] && result[1] == result[2])
            {
                return 10; // Example payout
            }
            return 0;
        }
    }
}
