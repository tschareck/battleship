import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { BattleService } from './services/battle.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [BattleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
