import {
  AfterViewInit,
  Component,
  ComponentRef,
  inject,
  input,
  Renderer2,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../services/modal.service';
import { ModalWrapperComponent } from './modal-wrapper.component';

@Component({
  selector: 'app-modal-backdrop',
  standalone: true,
  imports: [CommonModule, ModalWrapperComponent],
  templateUrl: './modal-backdrop.component.html',
})
export class ModalBackdropComponent implements AfterViewInit {
  renderer = inject(Renderer2);
  modalService = inject(ModalService);
  modalComponentRef = input.required<ComponentRef<unknown>>();
  modalContainer = viewChild.required('modalContainer', {
    read: ViewContainerRef,
  });

  ngAfterViewInit() {
    this.modalContainer().insert(this.modalComponentRef().hostView);
  }

  close() {
    this.modalService.close();
  }
}
