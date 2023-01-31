import { Component, Input } from '@angular/core';

import { CityWeatherData } from '../../app.component';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss'],
})
export class CityWeatherComponent {
  @Input() cityWeather: CityWeatherData | null;
  @Input() loading: boolean;
  @Input() error: string;
}
