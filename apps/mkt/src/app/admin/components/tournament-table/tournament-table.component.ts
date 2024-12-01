import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentStore } from '../../../store/tournaments.store';
import { ModalService } from '../../../services/modal.service';
import { AddTournamentForm } from '../../forms/add-tournament.form';

@Component({
  selector: 'app-tournament-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournament-table.component.html',
})
export class TournamentTableComponent {
  public readonly store = inject(TournamentStore);

  modalService = inject(ModalService);

  openModal() {
    this.modalService.open(AddTournamentForm, { title: 'Add Tournament' });
  }

  deleteTournament(id: number) {
    this.store.deleteTournament(id);
  }

  isInFuture(date: Date) {
    return new Date(date) > new Date();
  }

  startTournament(id: number) {
    this.store.startTournament(id);
  }

  pauseTournament(id: number) {
    this.store.pauseTournament(id);
  }
}
