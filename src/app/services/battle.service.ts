import { Injectable } from '@angular/core';
import { FieldEnum } from './field.enum';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  constructor() {}

  public boardData: FieldEnum[][] = [];

  public NewGame() {
    this.RandomizeBoard();
  }

  private RandomizeBoard() {
    // new 10x10 board filled with water
    this.boardData = new Array(10)
      .fill(null)
      .map(() => new Array(10).fill(FieldEnum.Water));

    // put battleship on random spot
    let startRow = Math.floor(Math.random() * 6);
    let startCol = Math.floor(Math.random() * 6);
    let direction = Math.random() < 0.5 ? 'h' : 'v';
    if (direction === 'h') {
      for (let i = 0; i < 5; i++) {
        this.boardData[startRow][startCol + i] = FieldEnum.Ship;
      }
    } else {
      for (let i = 0; i < 5; i++) {
        this.boardData[startRow + i][startCol] = FieldEnum.Ship;
      }
    }
    console.log(this.boardData);

    // // put destroyer on random spot
    // startRow = Math.floor(Math.random() * 6);
    // startCol = Math.floor(Math.random() * 6);
    // direction = Math.random() < 0.5 ? 'h' : 'v';
  }
}
