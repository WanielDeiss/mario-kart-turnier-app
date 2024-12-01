import { Component, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconData, IconName } from './icon.data';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
})
export class IconComponent {
  public readonly sanitizer = inject(DomSanitizer);
  name = input<IconName>('pause');

  currentIcon = signal<IconData>(IconData.play);

  constructor() {
    effect(
      () => {
        this.currentIcon.set(IconData[this.name()]);
      },
      { allowSignalWrites: true }
    );
  }
}
