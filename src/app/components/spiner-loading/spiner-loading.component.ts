import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spiner-loading',
  templateUrl: './spiner-loading.component.html',
  styleUrls: ['./spiner-loading.component.scss'],
})
export class SpinerLoadingComponent {
  @Input() size: 'small' | 'medium' | 'large';
  @Input() color: 'white' | 'dark' | 'gray';
}
