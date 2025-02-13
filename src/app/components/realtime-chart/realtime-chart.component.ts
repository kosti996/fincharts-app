import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../web-socket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-realtime-chart',
  imports: [CommonModule],
  templateUrl: './realtime-chart.component.html',
  styleUrl: './realtime-chart.component.scss'
})
export class RealtimeChartComponent implements OnInit, OnDestroy {
  messages: any[] = [];
  private messageSubscription!: Subscription;

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.messageSubscription = this.webSocketService.getMessages().subscribe(
      (message) => {
        this.messages.push(message);
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
}
