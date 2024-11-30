import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { ParticipantStore } from '../store/participant.store';

interface TournamentRegistrationModalData {
  tournamentId: number;
}

@Component({
  selector: 'app-tournament-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tournament-registration.form.html',
})
export class TournamentRegistrationForm {
  participantStore = inject(ParticipantStore);
  modalService = inject(ModalService);
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    tournamentId: [0, [Validators.required, Validators.min(1)]],
  });

  constructor() {
    const data = this.modalService.data as TournamentRegistrationModalData;
    this.form.controls.tournamentId.setValue(data.tournamentId);
  }

  async submit() {
    if (this.form.valid) {
      await this.participantStore.addToTournament(
        this.form.controls.tournamentId.value!,
        this.form.controls.name.value!
      );

      // if (response.id) {
      //   this.modalService.close();
      // }
    }
  }
}
