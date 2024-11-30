import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Tournament, TournamentResponse } from './tournament.model';
import { computed, inject } from '@angular/core';
import { TournamentService } from '../admin/services/tournament.service';
import { withLogger } from './features/logger.store-feature';
import { withLoading } from './features/loading.store-feature';

type TournamentState = {
  tournaments: TournamentResponse[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: TournamentState = {
  tournaments: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const TournamentStore = signalStore(
  { protectedState: false, providedIn: 'root' },
  withState(initialState),
  withComputed(({ tournaments, filter }) => ({
    count: computed(() => tournaments().length),
    // sortedBooks: computed(() => {
    //   const direction = filter.order() === 'asc' ? 1 : -1;

    //   return tournaments().toSorted(
    //     (a, b) => direction * a.name.localeCompare(b.name)
    //   );
    // }),
  })),
  withLogger('Tournament'),
  withLoading(),
  withMethods((store) => {
    const tournamentService = inject(TournamentService);

    return {
      async getAll() {
        patchState(store, (state) => ({ isLoading: true }));
        const tournaments = await tournamentService.getAll();
        patchState(store, (state) => ({ tournaments, isLoading: false }));
      },
      async addTournament(tournament: Tournament) {
        store.setLoading();
        const newTournament = await tournamentService.addTournament(tournament);
        patchState(store, (state) => ({
          tournaments: [...state.tournaments, newTournament],
        }));
        store.setCompleted();
      },
      async deleteTournament(id: number) {
        patchState(store, (state) => ({ isLoading: true }));
        await tournamentService.deleteTournament(id);
        patchState(store, (state) => ({
          tournaments: state.tournaments.filter((t) => t.id !== id),
          isLoading: false,
        }));
      },
      updateQuery(query: string): void {
        // 👇 Updating state using the `patchState` function.
        patchState(store, (state) => ({ filter: { ...state.filter, query } }));
      },
      updateOrder(order: 'asc' | 'desc'): void {
        patchState(store, (state) => ({ filter: { ...state.filter, order } }));
      },
    };
  }),
  withHooks({
    onInit({ getAll }) {
      getAll();
    },
  })
);
