import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TournamentStore } from '../store/tournaments.store';

@Component({
  selector: 'app-startpage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './startpage.page.html',
})
export class StartpagePage {
  public readonly store = inject(TournamentStore);
}
