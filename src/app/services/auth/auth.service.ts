import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../../types/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<Token> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', 'app-cli')
      .set('username', username)
      .set('password', password);

    return this.http.post<Token>('/api/identity/realms/fintatech/protocol/openid-connect/token', body.toString(), { headers: headers });
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('access_token');
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
