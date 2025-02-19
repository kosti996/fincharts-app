import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../services/webSocket/web-socket.service';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);
import 'chartjs-chart-financial';
import { CandlestickElement, CandlestickController } from 'chartjs-chart-financial';
Chart.register(CandlestickElement, CandlestickController);
import 'chartjs-adapter-moment';
import { wsBars } from '../../types/wsBars';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-realtime-chart',
  imports: [CommonModule],
  templateUrl: './realtime-chart.component.html',
  styleUrl: './realtime-chart.component.scss'
})
export class RealtimeChartComponent implements OnInit, OnDestroy {
  messages: any[] = [];
  chart: any;
  private messageSubscription!: Subscription;

  constructor(private webSocketService: WebSocketService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.createChart();
      this.connect()
    }, 1000);
  }

  connect() {
    this.webSocketService.connect(this.authService.getToken() || '');

    this.messageSubscription = this.webSocketService.getMessages().subscribe({
      next: (message) => {
        this.updateChart(message);
      },
      error: error => console.log(error)
    });
  }

  sendMessage() {
    this.webSocketService.sendMessage();
  }

  closeConnection() {
    this.webSocketService.closeConnection();
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
    this.webSocketService.closeConnection();
  }

  getTimestamp(data: wsBars): string {
    if ('ask' in data) {
      return data.ask.timestamp;
    } else if ('bid' in data) {
      return data.bid.timestamp;
    } else if ('last' in data) {
      return data.last.timestamp;
    }
    return '';
  }

  getPrice(data: wsBars): number {
    if ('ask' in data) {
      return data.ask.price;
    } else if ('bid' in data) {
      return data.bid.price;
    } else if ('last' in data) {
      return data.last.price;
    }
    return 0;
  }

  createChart() {
    this.chart = new Chart('realtimeChart', {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Realtime price',
          data: [],
          fill: false,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time'
          },
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }

  updateChart(data: any) {
    let timestamp = this.getTimestamp(data);
    let price = this.getPrice(data);

    if (timestamp == '' || price == 0) {
      return;
    }

    this.chart.data.labels.push(new Date(timestamp));
    this.chart.data.datasets[0].data.push(price);

    if (this.chart.data.labels.length > 500) {
      this.chart.data.labels.shift();
      this.chart.data.datasets[0].data.shift();
    }

    this.chart.update();
  }
}
