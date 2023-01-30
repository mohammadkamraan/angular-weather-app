import { Component, Input, OnInit } from '@angular/core';
import { HttpRequestsService } from 'src/app/services/http/http-requests.service.ts.service';

import { CityWeatherData } from '../../app.component';

@Component({
  selector: 'app-added-city',
  templateUrl: './added-city.component.html',
  styleUrls: ['./added-city.component.sass'],
})
export class AddedCityComponent implements OnInit {
  @Input() cityname: string;

  loading: boolean = false;

  cityWeather: CityWeatherData;

  constructor(private httpRequest: HttpRequestsService) {}

  onClick() {
    this.httpRequest.getCityWeather(this.cityname).subscribe((data) => {
      this.loading = true;
      this.cityWeather = { ...data, weather: data.main[0] };
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.onClick();
    console.log('happend');
  }
}
