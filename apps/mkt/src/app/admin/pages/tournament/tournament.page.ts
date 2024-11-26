import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentTableComponent } from '../../components/tournament-table/tournament-table.component';

@Component({
  selector: 'app-tournament',
  standalone: true,
  imports: [CommonModule, TournamentTableComponent],
  templateUrl: './tournament.page.html',
})
export class TournamentPage {}
