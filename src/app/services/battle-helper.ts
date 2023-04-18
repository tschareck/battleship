export class BattleHelper {
  static letterToNumberMap: { [key: string]: number } = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
  };

  public static GetIndexFromLetter(inputValue: string): number {
    if (inputValue.length > 0) {
      const firstLetter = inputValue.charAt(0);
      const firstLetterNumber = this.letterToNumberMap[firstLetter];
      return firstLetterNumber;
    } else {
      throw new Error('Argument too short');
    }
  }

  public static GetIndexFromNumbers(inputValue: string): number {
    if (inputValue.length > 1) {
      const numericPart = inputValue.substring(1);
      const number = parseInt(numericPart) - 1;
      return number;
    } else {
      throw new Error('Argument too short');
    }
  }

  static GetDescriptionFromCoord(x: number, y: number) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    return `${letters[x]}${(y + 1).toString()}`;
  }
}
