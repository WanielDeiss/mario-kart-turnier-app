import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-wrapper.component.html',
})
export class ModalWrapperComponent {
  modalService = inject(ModalService);

  title = this.modalService.options.title;

  close() {
    this.modalService.close();
  }
}
