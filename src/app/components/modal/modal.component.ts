import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() showModal: boolean;
  @Output() closeModalHandler = new EventEmitter();

  closeHandler = () => {
    this.closeModalHandler.emit();
  };
}
