import { Routes } from '@angular/router';
import { HistoricalChartComponent } from './components/historical-chart/historical-chart.component';
import { RealtimeChartComponent } from './components/realtime-chart/realtime-chart.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'historical-chart', component: HistoricalChartComponent },
    { path: 'realtime-chart', component: RealtimeChartComponent },
    { path: '**', redirectTo: '/' }
];
