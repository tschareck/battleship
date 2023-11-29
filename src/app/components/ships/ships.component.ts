import { Component, OnInit } from '@angular/core';
import { BattleService } from 'src/app/services/battle.service';
import { SunkenShips } from 'src/app/types/sunken-ships';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
})
export class ShipsComponent implements OnInit {
  constructor(private service: BattleService) {}

  ships: SunkenShips = [];

  ngOnInit(): void {
    this.service.sunkenShipsSubject.subscribe((val) => (this.ships = val));
  }
}
