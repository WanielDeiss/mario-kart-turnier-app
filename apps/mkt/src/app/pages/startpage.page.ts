import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-startpage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './startpage.page.html',
})
export class StartpagePage {}
