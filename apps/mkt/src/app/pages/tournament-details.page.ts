import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectedTournamentStore } from '../store/selected-tournament.store';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { TournamentRegistrationForm } from '../forms/tournament-registration.form';
import { ParticipantStore } from '../store/participant.store';

@Component({
  selector: 'app-tournament-details',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './tournament-details.page.html',
})
export class TournamentDetailsPage implements OnInit, OnDestroy {
  public readonly selectedTournamentStore = inject(SelectedTournamentStore);
  public readonly participantListStore = inject(ParticipantStore);
  activatedRouter = inject(ActivatedRoute);
  modalService = inject(ModalService);

  ngOnInit() {
    this.activatedRouter.params.subscribe((params) => {
      this.selectedTournamentStore.get(params['id']);
    });
  }

  ngOnDestroy(): void {
    this.selectedTournamentStore.clear();
  }

  constructor() {
    effect(
      () => {
        const tournamentId =
          this.selectedTournamentStore.selectedTournament()?.id;
        if (tournamentId) this.participantListStore.getAll(tournamentId);
      },
      { allowSignalWrites: true }
    );
  }

  openRegistrationModal(tournamentId: number) {
    this.modalService.open(TournamentRegistrationForm, {
      title: 'Register for Tournament',
      data: { tournamentId },
    });
  }
}
