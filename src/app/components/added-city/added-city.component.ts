import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
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

  @Input() cityIndex: number;

  @Output() deleteCity = new EventEmitter<number>();

  @Output() cardClick = new EventEmitter<string>();

  loading: boolean = false;

  cityWeather: CityWeatherData | null;

  requestSubscription: Subscription;

  showOptions: boolean = false;

  constructor(private httpRequest: HttpRequestsService) {}

  optionToggle(event: Event) {
    event.stopPropagation();
    this.showOptions = !this.showOptions;
  }

  onClick() {
    this.cardClick.emit(this.cityname);
  }

  getWeather(event?: Event) {
    event?.stopPropagation();
    this.cityWeather = null;
    this.loading = true;
    this.showOptions = false;
    this.requestSubscription = this.httpRequest
      .getCityWeather(this.cityname)
      .subscribe((data) => {
        this.cityWeather = { ...data, weather: data.weather[0] };
        this.loading = false;
      });
  }

  onDelete(event?: Event) {
    event?.stopPropagation();
    this.deleteCity.emit(this.cityIndex);
  }

  ngOnInit(): void {
    this.getWeather();
  }

  ngOnDestroy(): void {
    this.requestSubscription.unsubscribe();
  }
}
