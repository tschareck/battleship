import { FieldEnum } from '../types/field.enum';
import { deck, ship } from '../types/ship';

/**
 * Handle randomly placing ships on board
 */
export class PlacementService {
  private size: number;

  constructor(size: number) {
    this.size = size;
  }

  /**  new {size}x{size} board filled with water */
  public newBoard() {
    return new Array(this.size)
      .fill(null)
      .map(() => new Array(this.size).fill(FieldEnum.Water));
  }

  public placeShips(
    grid: FieldEnum[][],
    ships: ship[],
    shipSize: number,
    shipCount: number
  ) {
    while (shipCount > 0) {
      let x = Math.floor(Math.random() * (this.size - shipSize + 1));
      let y = Math.floor(Math.random() * (this.size - shipSize + 1));
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
        if (row >= 0 && row < this.size && col >= 0 && col < this.size) {
          if (grid[row][col] == FieldEnum.Ship) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
