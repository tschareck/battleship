import { Component, OnInit } from '@angular/core';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  constructor(private service: BattleService) {}

  history: string[] = [];

  ngOnInit(): void {
    this.service.historySubject.subscribe((val) => (this.history = val));
  }
}
