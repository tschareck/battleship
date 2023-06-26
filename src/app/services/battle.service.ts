import { Injectable } from '@angular/core';
import { FieldEnum } from '../types/field.enum';
import { BehaviorSubject, concatWith } from 'rxjs';
import { BattleHelper } from './battle-helper';
import { ship, deck } from '../types/ship';
import { PlacementService } from './placement.service';
import { ShipSinkService } from './ship-sink.service';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  private placementService: PlacementService;
  private shipSinkService: ShipSinkService;

  constructor() {
    this.placementService = new PlacementService(20);
    this.shipSinkService = new ShipSinkService([]);
  }

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
    const position = this.boardData[x][y];

    if (position === FieldEnum.Water) {
      this.setPosition(x, y, FieldEnum.Miss);
      this.shipSinkService.pushHistory(
        `${BattleHelper.GetDescriptionFromCoord(x, y)} - Miss :(`
      );
    } else if (position === FieldEnum.Ship) {
      this.setPosition(x, y, FieldEnum.Hit);
      this.shipSinkService.pushHistory(
        `${BattleHelper.GetDescriptionFromCoord(x, y)} - Hit!`
      );

      this.shipSinkService.MarkHit(x, y);
    }

    this.history = this.shipSinkService.history;
    this.historySubject.next(this.history);
  }

  setPosition(x: number, y: number, field: FieldEnum) {
    this.boardData[x][y] = field;
    this.boardSubject.next(this.boardData);
  }

  randomizeBoard() {
    this.boardData = this.placementService.newBoard();

    this.placementService.placeShips(this.boardData, this.ships, 5, 3);
    this.placementService.placeShips(this.boardData, this.ships, 4, 4);
    this.placementService.placeShips(this.boardData, this.ships, 3, 8);
    this.placementService.placeShips(this.boardData, this.ships, 2, 6);
    //this.placementService.placeShips(this.boardData, this.ships, 1, 8);

    this.shipSinkService = new ShipSinkService(this.ships);
    this.boardSubject.next(this.boardData);
  }
}
