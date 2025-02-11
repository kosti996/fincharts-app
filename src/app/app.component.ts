import { Component } from '@angular/core';
import { ChartComponent } from "./chart/chart.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ChartComponent]
})
export class AppComponent {
  title = 'fincharts-app';

}
