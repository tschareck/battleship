export class deck {
  x: number;
  y: number;
  isHit: boolean;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.isHit = false;
  }
};
export type ship = deck[];