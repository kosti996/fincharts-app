import { Routes } from '@angular/router';
import { HistoricalChartComponent } from './components/historical-chart/historical-chart.component';
import { RealtimeChartComponent } from './components/realtime-chart/realtime-chart.component';

export const routes: Routes = [
    { path: '', redirectTo: 'historical-chart', pathMatch: 'full' },
    { path: 'historical-chart', component: HistoricalChartComponent },
    { path: 'realtime-chart', component: RealtimeChartComponent },
    { path: '**', redirectTo: '/' }
];
