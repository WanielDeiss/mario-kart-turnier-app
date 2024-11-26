import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { TournamentResponse } from './tournament.model';
import { inject } from '@angular/core';
import { TournamentService } from '../admin/services/tournament.service';

type SelectedTournamentState = {
  selectedTournament: TournamentResponse | null;
  isLoading: boolean;
};

const initialState: SelectedTournamentState = {
  selectedTournament: null,
  isLoading: true,
};

export const SelectedTournamentStore = signalStore(
  { protectedState: false, providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const tournamentService = inject(TournamentService);

    return {
      async get(id: number) {
        patchState(store, (state) => ({ isLoading: true }));
        const tournament = await tournamentService.get(id);
        patchState(store, (state) => ({
          selectedTournament: tournament,
          isLoading: false,
        }));
      },
    };
  })
);
