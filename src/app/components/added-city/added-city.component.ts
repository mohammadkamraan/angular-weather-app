import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpRequestsService } from 'src/app/services/http/http-requests.service.ts.service';

import { CityWeatherData } from '../../app.component';

@Component({
  selector: 'app-added-city',
  templateUrl: './added-city.component.html',
  styleUrls: ['./added-city.component.scss'],
})
export class AddedCityComponent implements OnInit, OnDestroy {
  @Input() cityname: string;

  loading: boolean = false;

  cityWeather: CityWeatherData;

  requestSubscription: Subscription;

  constructor(private httpRequest: HttpRequestsService) {}

  onClick() {
    this.loading = true;
    this.requestSubscription = this.httpRequest
      .getCityWeather(this.cityname)
      .subscribe((data) => {
        this.cityWeather = { ...data, weather: data.weather[0] };
        this.loading = false;
        console.log(data);
      });
  }

  ngOnInit(): void {
    this.onClick();
  }
  ngOnDestroy(): void {
    this.requestSubscription.unsubscribe();
  }
}
