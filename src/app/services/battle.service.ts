import { Injectable } from '@angular/core';
import { FieldEnum } from '../types/field.enum';
import { BehaviorSubject } from 'rxjs';
import { BattleHelper } from './battle-helper';
import { ship, deck } from '../types/ship';
import { PlacementService } from './placement.service';
import { ShipSinkService } from './ship-sink.service';
import { SunkenShips } from '../types/sunken-ships';
import { DifficultyEnum } from '../types/difficulty.enum';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  private placementService: PlacementService;
  private shipSinkService: ShipSinkService;
  public difficulty: DifficultyEnum;

  constructor() {
    this.placementService = new PlacementService();
    this.shipSinkService = new ShipSinkService([]);
    this.difficulty = DifficultyEnum.Classic;
  }

  boardData: FieldEnum[][] = [];
  public boardSubject = new BehaviorSubject<FieldEnum[][]>([]);

  history: string[] = [];
  public historySubject = new BehaviorSubject<string[]>([]);

  ships: ship[] = [];

  sunkenShipsSubject = new BehaviorSubject<SunkenShips>([]);

  public NewGame() {
    console.log(this.difficulty);

    this.history = [];
    this.historySubject.next([]);

    this.ships = [];
    this.randomizeBoard();

    this.sunkenShipsSubject.next(BattleHelper.GetSunkenFromShips(this.ships));
  }

  public ShotFired(x: number, y: number) {
    const position = this.boardData[x][y];
    this.shipSinkService.shotCounter++;

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

    this.sunkenShipsSubject.next(BattleHelper.GetSunkenFromShips(this.ships));
  }

  setPosition(x: number, y: number, field: FieldEnum) {
    this.boardData[x][y] = field;
    this.boardSubject.next(this.boardData);
  }

  randomizeBoard() {
    switch (this.difficulty) {
      case DifficultyEnum.ChildsPlay:
        this.boardData = this.placementService.newBoard(10);
        this.placementService.placeShips(this.boardData, this.ships, 5, 1);
        this.placementService.placeShips(this.boardData, this.ships, 4, 2);
        break;
      case DifficultyEnum.Easier:
        break;
      case DifficultyEnum.Classic:
        this.boardData = this.placementService.newBoard(10);
        this.placementService.placeShips(this.boardData, this.ships, 4, 1);
        this.placementService.placeShips(this.boardData, this.ships, 3, 2);
        this.placementService.placeShips(this.boardData, this.ships, 2, 3);
        this.placementService.placeShips(this.boardData, this.ships, 1, 4);
        break;
      case DifficultyEnum.Harder:
        this.boardData = this.placementService.newBoard(18);
        this.placementService.placeShips(this.boardData, this.ships, 5, 3);
        this.placementService.placeShips(this.boardData, this.ships, 4, 4);
        this.placementService.placeShips(this.boardData, this.ships, 3, 8);
        this.placementService.placeShips(this.boardData, this.ships, 2, 6);
        break;
      case DifficultyEnum.Brutal:
        this.boardData = this.placementService.newBoard(20);
        this.placementService.placeShips(this.boardData, this.ships, 5, 2);
        this.placementService.placeShips(this.boardData, this.ships, 4, 4);
        this.placementService.placeShips(this.boardData, this.ships, 3, 8);
        this.placementService.placeShips(this.boardData, this.ships, 2, 6);
        this.placementService.placeShips(this.boardData, this.ships, 1, 8);
        break;
      default:
        break;
    }

    this.shipSinkService = new ShipSinkService(this.ships);
    this.boardSubject.next(this.boardData);
  }
}
