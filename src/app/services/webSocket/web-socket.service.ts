import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { webSocketMessage, webSocketURL } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$!: WebSocketSubject<any>;

   connect(token: string) {
    this.socket$ = webSocket(`${webSocketURL}?token=${token}`);
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
