import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BattleService } from './services/battle.service';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { ShipsComponent } from './components/ships/ships.component';
import { HistoryComponent } from './components/history/history.component';
import { DifficultyComponent } from './components/difficulty/difficulty.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

import { ShipPositionDirective } from './directives/ship-position.directive';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ShipPositionDirective,
    HistoryComponent,
    FooterComponent,
    HeaderComponent,
    ShipsComponent,
    DifficultyComponent,
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
