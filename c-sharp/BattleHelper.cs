public class BattleHelper
{
    static Dictionary<string, int> letterToNumberMap = new Dictionary<string, int>()
    {
        {"A", 0},{"B", 1},{"C", 2},{"D", 3},{"E", 4},{"F", 5},{"G", 6},{"H", 7},{"I", 8},{"J", 9}
    };

    public static int GetIndexFromLetter(string inputValue)
    {
        if (inputValue.Length > 0)
        {
            string firstLetter = inputValue[0].ToString();
            int firstLetterNumber = letterToNumberMap[firstLetter];
            return firstLetterNumber;
        }
        else
        {
            throw new ArgumentException("Argument too short");
        }
    }

    public static int GetIndexFromNumbers(string inputValue)
    {
        if (inputValue.Length > 1)
        {
            string numericPart = inputValue.Substring(1);
            int number = int.Parse(numericPart) - 1;
            return number;
        }
        else
        {
            throw new ArgumentException("Argument too short");
        }
    }

    public static string GetDescriptionFromCoord(int x, int y)
    {
        string[] letters = new string[] { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J" };
        return $"{letters[x]}{(y + 1).ToString()}";
    }
}