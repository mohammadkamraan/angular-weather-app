import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  @Output() onFormSubmit = new EventEmitter<string>();
  @ViewChild('searchForm')
  searchForm: NgForm;

  onSubmit() {
    this.onFormSubmit.emit(this.searchForm.value.cityName);
  }

  addCity() {
    console.log(this.searchForm);
  }
}
