import { Component } from '@angular/core';
import { BattleService } from './services/battle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'battleship';

  constructor(private battleService: BattleService) {}

  callNewGame() {
    this.battleService.NewGame();
  }
}
