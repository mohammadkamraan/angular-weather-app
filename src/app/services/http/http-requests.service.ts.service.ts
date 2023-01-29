import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CityWeatherData } from '../../app.component';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {
  constructor(private http: HttpClient) {}

  getCityWeather(cityName: string): Observable<any> {
    return this.http.get<CityWeatherData>('', {
      params: { q: cityName },
    });
  }
}
