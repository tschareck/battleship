import { Injectable } from '@angular/core';
import { FieldEnum } from './field.enum';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  constructor() {}

  public boardData: FieldEnum[][] = [];

  public NewGame() {
    this.randomizeBoard();
  }

  private randomizeBoard() {
    // new 10x10 board filled with water
    this.boardData = new Array(10)
      .fill(null)
      .map(() => new Array(10).fill(FieldEnum.Water));

    // put battleship on random spot
    let startRow = Math.floor(Math.random() * 6);
    let startCol = Math.floor(Math.random() * 6);
    let direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
    if (direction === 'horizontal') {
      for (let i = 0; i < 5; i++) {
        this.boardData[startRow][startCol + i] = FieldEnum.Ship;
      }
    } else {
      for (let i = 0; i < 5; i++) {
        this.boardData[startRow + i][startCol] = FieldEnum.Ship;
      }
    }

    // put destroyer on random spot
    do {
      startRow = Math.floor(Math.random() * 6);
      startCol = Math.floor(Math.random() * 6);
      direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
    } while (!this.isStartpointValid(startRow, startCol, direction));

    if (direction === 'horizontal') {
      for (let i = startCol; i < startCol + 4; i++) {
        this.boardData[startRow][i] = FieldEnum.Ship;
      }
    } else {
      for (let i = startRow; i < startRow + 4; i++) {
        this.boardData[i][startCol] = FieldEnum.Ship;
      }
    }

    // put another one
    do {
      startRow = Math.floor(Math.random() * 6);
      startCol = Math.floor(Math.random() * 6);
      direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
    } while (!this.isStartpointValid(startRow, startCol, direction));

    if (direction === 'horizontal') {
      for (let i = startCol; i < startCol + 4; i++) {
        this.boardData[startRow][i] = FieldEnum.Ship;
      }
    } else {
      for (let i = startRow; i < startRow + 4; i++) {
        this.boardData[i][startCol] = FieldEnum.Ship;
      }
    }
  }

  private isStartpointValid(row: number, col: number, direction: string): boolean {
    let isValid = true;

    if (direction === 'horizontal') {
      for (let i = col; i < col + 4; i++) {
        if (this.boardData[row][i] === FieldEnum.Ship) {
          isValid = false;
          break;
        }
      }
    } else {
      for (let i = row; i < row + 4; i++) {
        if (this.boardData[i][col] === FieldEnum.Ship) {
          isValid = false;
          break;
        }
      }
    }

    return isValid;
  }
}
