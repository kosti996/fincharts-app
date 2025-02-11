import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);
import { CandlestickElement, CandlestickController } from 'chartjs-chart-financial';
Chart.register(CandlestickElement, CandlestickController);
import 'chartjs-adapter-moment';

const barData = [
  {}
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
