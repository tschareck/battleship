import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { BattleService } from './services/battle.service';
import { AnswerComponent } from './components/answer/answer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShipPositionDirective } from './directives/ship-position.directive';
import { HistoryComponent } from './components/history/history.component';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    AnswerComponent,
    ShipPositionDirective,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGoogleAnalyticsModule.forRoot('G-BX2FGT6B21'),
  ],
  providers: [BattleService],
  bootstrap: [AppComponent],
})
export class AppModule {}
