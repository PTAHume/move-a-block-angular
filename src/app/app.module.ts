import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { CdTimerModule } from 'angular-cd-timer';
import { AppComponent } from './components/game/game.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, CdTimerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
