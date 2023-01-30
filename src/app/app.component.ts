import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpRequestsService } from './services/http/http-requests.service.ts.service';

interface WeatherName {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
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
export class AppComponent implements OnDestroy, OnInit {
  cityWeater: CityWeatherData | null;
  loading: boolean = false;

  requestSubscriptions: Subscription;

  cities: string[] = [];

  constructor(public requestsService: HttpRequestsService) {}

  onFormSubmit(cityName: string) {
    this.cityWeater = null;
    this.loading = true;
    this.requestsService.getCityWeather(cityName).subscribe((data) => {
      this.cityWeater = { ...data, weather: data.weather[0] };
      this.loading = false;
    });
  }

  onAddCity(cityName: string) {
    this.cities.push(cityName);
    localStorage.setItem('cities', JSON.stringify(this.cities));
  }

  deleteCity(cityIndex: number) {
    const modifiedCities = this.cities.filter((city: string, index: number) => {
      return cityIndex !== index;
    });
    this.cities = modifiedCities;
    if (!this.cities.length) localStorage.removeItem('cities');
    else localStorage.setItem('cities', JSON.stringify(this.cities));
  }

  ngOnInit(): void {
    const citiesArray = JSON.parse(localStorage.getItem('cities') as string);
    if (citiesArray?.length) {
      this.cities = citiesArray;
    }
  }

  ngOnDestroy(): void {
    this.requestSubscriptions.unsubscribe();
  }
}
