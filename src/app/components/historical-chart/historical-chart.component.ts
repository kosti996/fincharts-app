import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);
import 'chartjs-chart-financial';
import { CandlestickElement, CandlestickController } from 'chartjs-chart-financial';
Chart.register(CandlestickElement, CandlestickController);
import 'chartjs-adapter-moment';
import { BarsService } from '../../services/bars/bars.service';
import { Bars } from '../../types/bars';

@Component({
  selector: 'app-historical-chart',
  imports: [],
  templateUrl: './historical-chart.component.html',
  styleUrl: './historical-chart.component.scss'
})
export class HistoricalChartComponent implements OnInit {
  barData!: Bars;
  chart: any;

  constructor(private barsService: BarsService) { }

  ngOnInit() {
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
