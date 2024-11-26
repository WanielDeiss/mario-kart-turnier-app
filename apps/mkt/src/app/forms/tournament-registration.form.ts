import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tournament-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tournament-registration.form.html',
})
export class TournamentRegistrationForm {
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    tournamentId: ['', [Validators.required]],
  });

  submit() {}
}
