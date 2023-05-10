public static class Help{
    public static void DisplayHelp ()
    {
        Console.WriteLine ("* To display help, type \"help\"");
        Console.WriteLine ("* To finish, type \"exit\"");
        Console.WriteLine ("* To start new game, type \"new\"");
        Console.WriteLine ("* To shoot, type coordinate as: \"A10\"");
    }

    public static void DisplaySplash(){
        Console.WriteLine(@"
 ███████████             █████     █████    ████                   █████       ███                   
░░███░░░░░███           ░░███     ░░███    ░░███                  ░░███       ░░░                    
 ░███    ░███  ██████   ███████   ███████   ░███   ██████   █████  ░███████   ████  ████████   █████ 
 ░██████████  ░░░░░███ ░░░███░   ░░░███░    ░███  ███░░███ ███░░   ░███░░███ ░░███ ░░███░░███ ███░░  
 ░███░░░░░███  ███████   ░███      ░███     ░███ ░███████ ░░█████  ░███ ░███  ░███  ░███ ░███░░█████ 
 ░███    ░███ ███░░███   ░███ ███  ░███ ███ ░███ ░███░░░   ░░░░███ ░███ ░███  ░███  ░███ ░███ ░░░░███
 ███████████ ░░████████  ░░█████   ░░█████  █████░░██████  ██████  ████ █████ █████ ░███████  ██████ 
░░░░░░░░░░░   ░░░░░░░░    ░░░░░     ░░░░░  ░░░░░  ░░░░░░  ░░░░░░  ░░░░ ░░░░░ ░░░░░  ░███░░░  ░░░░░░  
                                                                                    ░███             
                                                                                    █████            
=====================================================================================================
        ");
    }
}