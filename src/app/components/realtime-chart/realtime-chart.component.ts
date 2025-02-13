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

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.messageSubscription = this.webSocketService.getMessages().subscribe(
      (message) => {
        this.messages.push(message);
        console.log(message);
      }
    );
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
    throw new Error('Invalid data type');
  }

  getPrice(data: wsBars): number {
    if ('ask' in data) {
      return data.ask.price;
    } else if ('bid' in data) {
      return data.bid.price;
    } else if ('last' in data) {
      return data.last.price;
    }
    throw new Error('Invalid data type');
  }
}
