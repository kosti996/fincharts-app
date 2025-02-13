import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);
import 'chartjs-chart-financial';
import { CandlestickElement, CandlestickController } from 'chartjs-chart-financial';
Chart.register(CandlestickElement, CandlestickController);
import 'chartjs-adapter-moment';
import { AuthService } from '../../services/auth/auth.service';
import { BarsService } from '../../services/bars/bars.service';
import { Bars } from '../../types/bars';

@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {
  barData!: Bars;
  chart: any;

  constructor(
    private authService: AuthService,
    private barsService: BarsService) { }

  ngOnInit() {
    this.getToken();
    this.getData();
  }

  createChart() {
    this.chart = new Chart('historicalChart', {
      type: 'candlestick',
      data: {
        datasets: [{
          label: 'Historical price',
          data: this.barData.data,
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month',
            },
            ticks: {
              source: 'auto',
              stepSize: 1
            }
          },
          y: {
            ticks: {
              stepSize: 0.001
            }
          }
        }
      }
    });
  }

  getToken() {
    this.authService.login().subscribe({
      next: (response) => {
        this.authService.setToken(response.access_token);
      },
      error: (err) => {
        console.error('get token failed', err);
      }
    });
  }

  getData() {
    this.barsService.getCountBack().subscribe({
      next: (response) => {
        this.barData = { ...response };
        this.transformData(this.barData);

        //draw chart
        this.createChart();
      },
      error: (err) => {
        console.error('get data failed', err);
      }
    });
  }

  transformData(obj: any): any {
    obj.data.forEach((item: any) => {
      item.x = new Date(item.t).valueOf();
      delete item.t;
    });
    return obj;
  }
}
