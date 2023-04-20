import { Component } from '@angular/core';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent {
  inputValue = '';

  constructor(private service: BattleService) {}

  public CheckShot() {
    if (this.inputValue) {
      this.service.ShotFiredByText(this.inputValue.toUpperCase());
    }
    this.inputValue = '';
  }
}
