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

  errorText: string;

  errorClearTimer: any;

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
      .subscribe(
        (data) => {
          this.cityWeather = { ...data, weather: data.weather[0] };
          this.loading = false;
        },
        (error) => {
          if (error.status) {
            this.errorText = 'the city weather not founded!';
          } else {
            this.errorText = 'something went wrong please try again later:(';
          }
          this.loading = false;
          this.errorClearTimer = setTimeout(() => {
            this.errorText = '';
          }, 5000);
        }
      );
  }

  onDelete(event?: Event) {
    event?.stopPropagation();
    this.deleteCity.emit(this.cityIndex);
  }

  closeAlertHandler() {
    clearTimeout(this.errorClearTimer);
    this.errorText = '';
    this.loading = false;
  }

  ngOnInit(): void {
    this.getWeather();
  }

  ngOnDestroy(): void {
    this.requestSubscription.unsubscribe();
  }
}
