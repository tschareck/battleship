import { Component, OnInit } from '@angular/core';
import { BattleService } from './services/battle.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'battleship';

  constructor(
    private battleService: BattleService,
    protected gaService: GoogleAnalyticsService
  ) {}

  ngOnInit(): void {
    this.gaService.pageView('/', 'app');
  }

  callNewGame() {
    this.battleService.NewGame();
  }
}
