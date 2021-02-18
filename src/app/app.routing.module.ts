import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeftpanelComponent } from './leftpanel/leftpanel.component';
import { OptionsviewComponent } from './optionsview/optionsview.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { DrawboardComponent } from './drawboard/drawboard.component';
import { ChartboardComponent } from './chartboard/chartboard.component';

const routes: Routes = [
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
        path: 'drawboard',
        component: DrawboardComponent
    },
    {
        path: 'chartboard',
        component: ChartboardComponent
    },
    {
        path: 'gameboard',
        component: GameboardComponent
    },
    {
        path: 'options',
        component: OptionsviewComponent
    },
    {
        path: '**',
        component: IntroComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(
        routes,
        { enableTracing: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }