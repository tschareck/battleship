using System;
class Program
{
  static void Main ()
  {
    Help.DisplayHelp ();
    string input = "";
    while (input != "exit")
    {
        Console.Write ("Enter command: ");
        input = Console.ReadLine();
        if (input == "help")
        {
            Help.DisplayHelp ();
        }
        else if (input != "exit")
        {
            SomeMethod (input);
        }
    }
  }

  static void SomeMethod (string input)
  {
    Console.WriteLine ("You entered: " + input);
  }

}