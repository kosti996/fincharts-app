import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);
import { CandlestickElement, CandlestickController } from 'chartjs-chart-financial';
Chart.register(CandlestickElement, CandlestickController);
import 'chartjs-adapter-moment';

const barData = [
  {
    "x": new Date("2025-02-11T20:31:00+00:00"),
    "o": 1.03627,
    "h": 1.03638,
    "l": 1.03626,
    "c": 1.03638,
    "v": 65
  },
  {
    "x": new Date("2025-02-11T20:32:00+00:00"),
    "o": 1.03637,
    "h": 1.03666,
    "l": 1.03637,
    "c": 1.0366,
    "v": 147
  },
];

@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {
  chart: any;

  ngOnInit() {
    this.chart = new Chart('MyChart', {
      type: 'candlestick',
      data: {
        datasets: [{
          label: 'CHRT - Chart.js Corporation',
          data: barData,
        }]
      }
    });
  }
}
