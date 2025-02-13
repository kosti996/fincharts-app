import { Component } from '@angular/core';
import { ChartComponent } from "./components/historical-chart/chart.component";
import { RealtimeChartComponent } from "./components/realtime-chart/realtime-chart.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ChartComponent, RealtimeChartComponent]
})
export class AppComponent {
  title = 'fincharts-app';

}
