import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  @Output() onFormSubmit = new EventEmitter<string>();
  @Output() onAddCity = new EventEmitter<string>();
  @ViewChild('searchForm')
  searchForm: NgForm;

  onSubmit() {
    console.log('is it happening?');
    this.onFormSubmit.emit(this.searchForm.value.cityName);
  }

  addCity() {
    this.searchForm.reset();
    this.onAddCity.emit(this.searchForm.value.cityName);
  }
}
