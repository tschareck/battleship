import { Injectable } from '@angular/core';
import { FieldEnum } from './field.enum';
import { deck, ship } from '../types/ship';

@Injectable({
  providedIn: 'root',
})

/**
 * Handle randomly placing ships on board
 */
export class PlacementService {
  /**  new 10x10 board filled with water */
  public newBoard() {
    return new Array(10)
      .fill(null)
      .map(() => new Array(10).fill(FieldEnum.Water));
  }

  public placeShips(
    grid: FieldEnum[][],
    ships: ship[],
    shipSize: number,
    shipCount: number
  ) {
    while (shipCount > 0) {
      let x = Math.floor(Math.random() * (10 - shipSize + 1));
      let y = Math.floor(Math.random() * (10 - shipSize + 1));
      let isVertical = Math.random() < 0.5;
      if (this.canPlaceShip(grid, x, y, shipSize, isVertical)) {
        let ship: ship = [];
        for (let i = 0; i < shipSize; i++) {
          if (isVertical) {
            grid[x + i][y] = FieldEnum.Ship;
            ship.push(new deck(x + i, y));
          } else {
            grid[x][y + i] = FieldEnum.Ship;
            ship.push(new deck(x, y + i));
          }
        }
        ships.push(ship);
        shipCount--;
      }
    }
  }

  private canPlaceShip(
    grid: FieldEnum[][],
    x: number,
    y: number,
    shipSize: number,
    isVertical: boolean
  ) {
    for (let i = -1; i <= shipSize; i++) {
      for (let j = -1; j <= 1; j++) {
        let row = isVertical ? x + i : x + j;
        let col = isVertical ? y + j : y + i;
        if (row >= 0 && row < 10 && col >= 0 && col < 10) {
          if (grid[row][col] == FieldEnum.Ship) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
