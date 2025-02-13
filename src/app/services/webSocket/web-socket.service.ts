import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { webSocketMessage, webSocketURL } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;
  private wsURL = `${webSocketURL}?token=${localStorage.getItem('access_token')}`;

  constructor() {
     this.socket$ = webSocket(this.wsURL);
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
