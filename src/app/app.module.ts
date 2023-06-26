import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { BattleService } from './services/battle.service';
import { AnswerComponent } from './components/answer/answer.component';
import { ShipPositionDirective } from './directives/ship-position.directive';
import { HistoryComponent } from './components/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    AnswerComponent,
    ShipPositionDirective,
    HistoryComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [BattleService],
  bootstrap: [AppComponent],
})
export class AppModule {}
