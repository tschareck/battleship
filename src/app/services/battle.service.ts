import { Injectable } from '@angular/core';
import { FieldEnum } from './field.enum';
import { BehaviorSubject, concatWith } from 'rxjs';
import { BattleHelper } from './battle-helper';
import { ship, deck } from '../types/ship';
import { PlacementService } from './placement.service';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  constructor(private placementService: PlacementService) {}

  boardData: FieldEnum[][] = [];
  public boardSubject = new BehaviorSubject<FieldEnum[][]>([]);

  history: string[] = [];
  public historySubject = new BehaviorSubject<string[]>([]);

  ships: ship[] = [];

  public NewGame() {
    this.history = [];
    this.historySubject.next([]);
    this.ships = [];

    this.randomizeBoard();
  }

  public ShotFired(x: number, y: number) {
    let position = this.boardData[x][y];

    if (position === FieldEnum.Water) {
      this.setPosition(x, y, FieldEnum.Miss);
      this.pushHistory(
        `${BattleHelper.GetDescriptionFromCoord(x, y)} - Miss :(`
      );
    } else if (position === FieldEnum.Ship) {
      this.setPosition(x, y, FieldEnum.Hit);
      this.pushHistory(`${BattleHelper.GetDescriptionFromCoord(x, y)} - Hit!`);

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
          this.pushHistory("You've sunk my battleship !!!");
          this.ships.splice(targetRow, 1);
          break;
        }
      }

      if (this.ships.length == 0) {
        this.pushHistory('GAME OVER. You finished all my ships.');
      }
    }
  }

  public ShotFiredByText(inputValue: string) {
    const x = BattleHelper.GetIndexFromLetter(inputValue);
    const y = BattleHelper.GetIndexFromNumbers(inputValue);
    this.ShotFired(x, y);
  }

  setPosition(x: number, y: number, field: FieldEnum) {
    this.boardData[x][y] = field;
    this.boardSubject.next(this.boardData);
  }

  randomizeBoard() {
    this.boardData = this.placementService.newBoard();

    this.placementService.placeShips(this.boardData, this.ships, 4, 1);
    this.placementService.placeShips(this.boardData, this.ships, 3, 2);
    this.placementService.placeShips(this.boardData, this.ships, 2, 3);
    this.placementService.placeShips(this.boardData, this.ships, 1, 4);

    this.boardSubject.next(this.boardData);
  }

  pushHistory(hist: string) {
    this.history.push(hist);
    this.historySubject.next(this.history);
  }
}
