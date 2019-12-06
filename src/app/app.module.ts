import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeftpanelComponent } from './leftpanel/leftpanel.component';
import { PanelactionService } from './shared/service/panelaction.service';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    DashboardComponent,
    LeftpanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'intro',
        pathMatch: 'full'
      },
       {
          path: 'intro',
          component: IntroComponent
       },
       {
          path: 'dashboard',
          component: DashboardComponent
       },
       {
          path: '**',
          component: IntroComponent
       }
    ])
  ],
  providers: [
    PanelactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
