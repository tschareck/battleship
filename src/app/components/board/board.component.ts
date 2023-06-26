import { Component, OnInit } from '@angular/core';
import { BattleService } from 'src/app/services/battle.service';
import { FieldEnum } from 'src/app/types/field.enum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  BoardData: FieldEnum[][] | undefined;

  constructor(private service: BattleService) {}

  ngOnInit(): void {
    this.service.NewGame();

    this.service.boardSubject.subscribe((value) => {
      this.BoardData = value;
    });
  }

  CellClicked(row: number, cell: number) {
    this.service.ShotFired(row, cell);
  }
}
