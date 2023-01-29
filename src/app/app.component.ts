import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpRequestsService } from './services/http/http-requests.service.ts.service';

interface WeatherName {
  feels_like: number;
  humidity: number;
  pressure: number;
  tem: number;
  temp_max: number;
  temp_min: number;
}

interface Sys {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface CityWeatherData {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lon: number; lat: number };
  dt: number;
  id: number;
  main: WeatherName;
  name: string;
  sys: Sys;
  timezone: number;
  visibility: number;
  weather: Weather;
  wind: { deg: number; speed: number };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  cityWeater: CityWeatherData;

  requestSubscriptions: Subscription;

  constructor(public requestsService: HttpRequestsService) {}

  onFormSubmit(cityName: string) {
    this.requestsService.getCityWeather(cityName).subscribe((data) => {
      this.cityWeater = { ...data, weather: data.weather[0] };
      console.log(this.cityWeater);
    });
  }

  ngOnDestroy(): void {
    this.requestSubscriptions.unsubscribe();
  }
}
