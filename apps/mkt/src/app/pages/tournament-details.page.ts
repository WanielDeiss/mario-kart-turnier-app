import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectedTournamentStore } from '../store/selected-tournament.store';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { TournamentRegistrationForm } from '../forms/tournament-registration.form';

@Component({
  selector: 'app-tournament-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournament-details.page.html',
})
export class TournamentDetailsPage implements OnInit {
  public readonly selectedTournamentStore = inject(SelectedTournamentStore);
  activatedRouter = inject(ActivatedRoute);
  modalService = inject(ModalService);

  ngOnInit() {
    this.activatedRouter.params.subscribe((params) => {
      this.selectedTournamentStore.get(params['id']);
    });
  }

  openRegistrationModal(tournamentId: number) {
    this.modalService.open(TournamentRegistrationForm, {
      title: 'Register for Tournament',
      data: { tournamentId },
    });
  }
}
