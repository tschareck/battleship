export class BattleHelper {
  static GetDescriptionFromCoord(x: number, y: number) {
    const letters = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'R',
      'S',
      'T',
      'U',
      'W',
    ];
    return `${letters[x]}${(y + 1).toString()}`;
  }
}
