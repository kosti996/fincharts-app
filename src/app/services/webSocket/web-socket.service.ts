import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { webSocketMessage, webSocketURL } from '../../constants';
import { wsBarsAsk, wsBarsBid, wsBarsLast } from '../../types/wsBars';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
     this.socket$ = webSocket(`${webSocketURL}?token=${localStorage.getItem('access_token')}`);
   }
 
   sendMessage() {
     this.socket$.next(webSocketMessage);
   }
 
   getMessages(): Observable<any> {
     return this.socket$.asObservable();
   }
 
   closeConnection() {
     this.socket$.complete();
   }
}
