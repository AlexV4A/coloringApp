import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeftpanelComponent } from './leftpanel/leftpanel.component';
import { PanelactionService } from './shared/service/panelaction.service';
import { OptionsviewComponent } from './optionsview/optionsview.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { DrawboardComponent } from './drawboard/drawboard.component';
import { GameloggerComponent } from './gamelogger/gamelogger.component';


import { GenericmodalsModule } from './genericmodals/genericmodals.module';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    DashboardComponent,
    LeftpanelComponent,
    OptionsviewComponent,
    GameboardComponent,
    DrawboardComponent,
    GameloggerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    GenericmodalsModule
  ],
  providers: [
    PanelactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
