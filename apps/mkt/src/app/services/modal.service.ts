import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  Inject,
  Injectable,
  Injector,
} from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ModalBackdropComponent } from '../components/modal-backdrop.component';

interface ModalOptions {
  title?: string;
  data?: unknown;
}

const MODAL_DEFAULTS: ModalOptions = {
  title: '',
  data: null,
};

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isModalVisible = false;
  isBackdropVisible = false;
  options: ModalOptions = MODAL_DEFAULTS;
  data: unknown = undefined;

  _backdropComponentRef!: ComponentRef<ModalBackdropComponent>;
  _modalComponentRef!: ComponentRef<unknown>;

  constructor(
    private readonly _applicationRef: ApplicationRef,
    @Inject(DOCUMENT) private readonly _document: Document,
    private readonly _injector: Injector
  ) {}

  open(component: ComponentType<unknown>, options?: ModalOptions) {
    this.options = { ...this.options, ...options };
    this.data = options?.data;

    const containerElement = this._document.querySelector('body') as Element;

    if (this.isBackdropVisible) this.close();

    this._backdropComponentRef = this.attachBackdrop(containerElement);
    this._modalComponentRef = this.createModalComponent(component);

    console.log('this._modalComponentRef', this._modalComponentRef);

    this._backdropComponentRef.setInput(
      'modalComponentRef',
      this._modalComponentRef
    );

    console.log(
      'this._backdropComponentRef.instance.modalComponentRef',
      this._backdropComponentRef.instance.modalComponentRef
    );
  }

  attachBackdrop(containerElement: Element) {
    const backdropComponentRef = createComponent(ModalBackdropComponent, {
      environmentInjector: this._applicationRef.injector,
      elementInjector: this._injector,
    });

    this._applicationRef.attachView(backdropComponentRef.hostView);
    containerElement.appendChild(backdropComponentRef.location.nativeElement);

    this.isBackdropVisible = true;

    return backdropComponentRef;
  }

  createModalComponent(modalComponent: ComponentType<unknown>) {
    const modalComponentRef = createComponent(modalComponent, {
      environmentInjector: this._applicationRef.injector,
    });

    this._applicationRef.attachView(modalComponentRef.hostView);

    this.isModalVisible = true;

    return modalComponentRef;
  }

  detachBackdrop(backdropComponentRef: ComponentRef<ModalBackdropComponent>) {
    this._applicationRef.detachView(backdropComponentRef.hostView);
    backdropComponentRef.destroy();
    this.isBackdropVisible = false;
  }

  detachModal(modalComponentRef: ComponentRef<unknown>) {
    this._applicationRef.detachView(modalComponentRef.hostView);
    modalComponentRef.destroy();
    this.isModalVisible = false;
  }

  detachAll() {
    this.detachModal(this._modalComponentRef);
    this.detachBackdrop(this._backdropComponentRef);
  }

  close() {
    this.isModalVisible = false;
    this.isBackdropVisible = false;
    this.data = undefined;
    this.options = MODAL_DEFAULTS;
    this.detachAll();
  }
}
