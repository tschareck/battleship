import { Injectable } from '@angular/core';
import { FieldEnum } from './field.enum';
import { BehaviorSubject } from 'rxjs';
import { BattleHelper } from './battle-helper';
import { ship, deck } from '../types/ship';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  constructor() {}

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
    // new 10x10 board filled with water
    this.boardData = new Array(10)
      .fill(null)
      .map(() => new Array(10).fill(FieldEnum.Water));

    this.putShipOnBoard(4);
    this.putShipOnBoard(3);
    this.putShipOnBoard(3);
    this.putShipOnBoard(2);
    this.putShipOnBoard(2);
    this.putShipOnBoard(2);
    this.putShipOnBoard(1);
    this.putShipOnBoard(1);
    this.putShipOnBoard(1);
    this.putShipOnBoard(1);

    this.boardSubject.next(this.boardData);
  }

  putShipOnBoard(masts: number) {
    // put ship on random spot
    let startRow: number;
    let startCol: number;
    let isHorizontal: boolean;
    do {
      startRow = Math.floor(Math.random() * (11 - masts));
      startCol = Math.floor(Math.random() * (11 - masts));
      isHorizontal = Math.random() < 0.5;
    } while (!this.isStartpointValid(startRow, startCol, isHorizontal, masts));

    let destroyer1: ship = [];
    if (isHorizontal) {
      for (let i = startCol; i < startCol + masts; i++) {
        this.boardData[startRow][i] = FieldEnum.Ship;
        destroyer1.push(new deck(startRow, i));
      }
    } else {
      for (let i = startRow; i < startRow + masts; i++) {
        this.boardData[i][startCol] = FieldEnum.Ship;
        destroyer1.push(new deck(i, startCol));
      }
    }
    this.ships.push(destroyer1);
  }

  isStartpointValid(
    row: number,
    col: number,
    isHorizontal: boolean,
    masts: number
  ): boolean {
    let isValid = true;

    if (isHorizontal) {
      for (let i = col; i < col + masts; i++) {
        if (this.boardData[row][i] === FieldEnum.Ship) {
          isValid = false;
          break;
        }
      }
    } else {
      for (let i = row; i < row + masts; i++) {
        if (this.boardData[i][col] === FieldEnum.Ship) {
          isValid = false;
          break;
        }
      }
    }

    return isValid;
  }

  pushHistory(hist: string) {
    this.history.push(hist);
    this.historySubject.next(this.history);
  }
}
