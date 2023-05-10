using System;
class Program
{
  static void Main()
  {
    Help.DisplaySplash();
    Help.DisplayHelp();

    string input = "";
    var gameService = default(BattleService);
    while (input != "exit")
    {
      Console.Write("Enter command: ");
      input = Console.ReadLine();
      if (input == "help")
      {
        Help.DisplayHelp();
      }
      else if (input == "new")
      {
        gameService = new BattleService();
        gameService.NewGame();
      }
      else if (input != "exit")
      {
        Shoot(input, gameService);
      }
    }

    static void Shoot(string input, BattleService gameService)
    {
      if(gameService == null){
        System.Console.WriteLine("Type \"new\" to start new game.");
        return;
      }
      else
      {
        gameService.ShotFiredByText(input);
      }
    }

  }
}