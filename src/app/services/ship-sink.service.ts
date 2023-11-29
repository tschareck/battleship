import { ship } from '../types/ship';

export class ShipSinkService {
  ships: ship[];
  history: string[];
  shotCounter: number;

  constructor(ships: ship[]) {
    this.ships = ships;
    this.history = [];
    this.shotCounter = 0;
  }

  MarkHit(x: number, y: number) {
    // mark hits in ships array
    for (let i = 0; i < this.ships.length; i++) {
      for (let j = 0; j < this.ships[i].length; j++) {
        if (this.ships[i][j].x === x && this.ships[i][j].y === y) {
          this.ships[i][j].isHit = true;
        }
      }
    }

    // check if sunk
    for (let targetRow = 0; targetRow < this.ships.length; targetRow++) {
      let allHit = true;
      for (let i = 0; i < this.ships[targetRow].length; i++) {
        if (this.ships[targetRow][i].isHit === false) {
          allHit = false;
          break;
        }
      }

      if (allHit) {
        this.history.push("You've sunk my battleship !!!");
        this.ships.splice(targetRow, 1);
        break;
      }
    }

    if (this.ships.length == 0) {
      this.history.push('GAME OVER. You finished all my ships.');
      this.history.push(`You fired ${this.shotCounter} shots.`);
    }
  }

  pushHistory(hist: string) {
    this.history.push(hist);
  }
}
