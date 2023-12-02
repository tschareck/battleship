import { Component } from '@angular/core';
import { BattleService } from 'src/app/services/battle.service';
import { DifficultyEnum } from 'src/app/types/difficulty.enum';

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.scss'],
})
export class DifficultyComponent {
  constructor(private service: BattleService) {}

  difficulty: DifficultyEnum = DifficultyEnum.Classic;

  BtnClick(arg0: number) {
    this.difficulty = arg0;
    this.service.difficulty = this.difficulty;
    this.service.NewGame();
  }
}
