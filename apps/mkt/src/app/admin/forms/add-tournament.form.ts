import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TournamentService } from '../services/tournament.service';
import { Tournament } from '../../store/tournament.model';
import { TournamentStore } from '../../store/tournaments.store';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-add-tournament',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-tournament.form.html',
})
export class AddTournamentForm {
  formBuilder = inject(FormBuilder);
  tournamentService = inject(TournamentService);
  modalService = inject(ModalService);
  private readonly store = inject(TournamentStore);

  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    startDate: [''],
  });

  async submit() {
    if (this.form.valid) {
      const tournament: Tournament = {
        name: this.form.controls.name.value!,
        startDate: new Date(this.form.controls.startDate.value!),
      };
      await this.store.addTournament(tournament);
      this.modalService.close();
    }
  }
}
