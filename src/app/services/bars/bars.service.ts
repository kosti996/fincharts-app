import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URI } from '../../constants';
import { Bars } from '../../types/bars';

@Injectable({
  providedIn: 'root'
})
export class BarsService {
  constructor(private http: HttpClient) { }

  getCountBack(): Observable<Bars> {
    const options = {
      params: new HttpParams()
        .set('instrumentId', 'ebefe2c7-5ac9-43bb-a8b7-4a97bf2c2576')
        .set('provider', 'oanda')
        .set('periodicity', 'day')
        .set('barsCount', 500)
        .set('interval', 1)
    }

    return this.http.get<Bars>(`${URI}/api/bars/v1/bars/count-back`, options);
  }
}
