import { Component, OnInit, viewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);
import { CandlestickElement, CandlestickController } from 'chartjs-chart-financial';
Chart.register(CandlestickElement, CandlestickController);
import 'chartjs-adapter-moment';
import { AuthService } from '../services/auth/auth.service';
import { BarsService } from '../services/bars/bars.service';
import { Bars } from '../types/bars';

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
    //get token
    this.authService.login().subscribe({
      next: (response) => {
        this.authService.setToken(response.access_token);
      },
      error: (err) => {
        console.error('get token failed', err);
      }
    });

    //get data
    this.barsService.getCountBack().subscribe({
      next: (response) => {
        this.barData = { ...response };
        this.transformData(this.barData);

        //draw chart
        this.chart = new Chart('MyChart', {
          type: 'candlestick',
          data: {
            datasets: [{
              label: 'Historical price',
              data: this.barData.data,
            }]
          }
        });
      },
      error: (err) => {
        console.error('get data failed', err);
      }
    });
  }

  transformData(obj: any): any {
    obj.data.forEach((item: any) => {
      item.x = new Date(item.t);
      delete item.t;
    });
    return obj;
  }
}
