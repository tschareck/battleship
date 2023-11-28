import { ship } from '../types/ship';
import { SunkenShips } from '../types/sunken-ships';

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

  static GetSunkenFromShips(ships: ship[]): SunkenShips {
    let result: SunkenShips = [];

    ships.forEach((ship) => {
      let mast = ship.length;
      let sunken = ship.every((deck) => deck.isHit);

      result.push({ isSunk: sunken, mast: mast });
    });

    return result;
  }
}
