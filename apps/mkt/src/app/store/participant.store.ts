import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { ParticipantService } from '../services/participant.service';
import { SelectedTournamentStore } from './selected-tournament.store';
import { withLogger } from './features/logger.store-feature';
import { withLoading } from './features/loading.store-feature';
import { ModalService } from '../services/modal.service';

type ParticipantState = {
  participants: string[];
  tournamentId: number;
  isLoading: boolean;
};

const initialState: ParticipantState = {
  participants: [],
  tournamentId: 0,
  isLoading: false,
};

export const ParticipantStore = signalStore(
  { protectedState: false, providedIn: 'root' },
  withState(initialState),
  withComputed(({ participants }) => ({
    count: computed(() => participants().length),
  })),
  withLogger('ParticipantStore'),
  withLoading(),
  withMethods((store) => {
    const participantService = inject(ParticipantService);
    const modalService = inject(ModalService);

    return {
      async getAll(tournamentId: number) {
        patchState(store, (state) => ({ isLoading: true }));
        const res = await participantService.getAllByTournamentId(tournamentId);
        patchState(store, (state) => ({ ...res, isLoading: false }));
      },
      clear() {
        patchState(store, initialState);
      },
      async addToTournament(tournamentId: number, participant: string) {
        store.setLoading();
        const res = await participantService.addToTourament(
          tournamentId,
          participant
        );
        store.setCompleted();
        if (res.id) {
          patchState(store, (state) => ({
            participants: [...state.participants, participant],
          }));
          modalService.close();
        }
      },
    };
  }),
  withHooks({
    onInit({ getAll }) {
      const selectedTournamentStore = inject(SelectedTournamentStore);
      const selectedTOurnamentId =
        selectedTournamentStore.selectedTournament()?.id;
      if (selectedTOurnamentId) getAll(selectedTOurnamentId);
    },
    onDestroy({ clear }) {
      clear();
    },
  })
);
