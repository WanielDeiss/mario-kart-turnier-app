import { signalStore, withMethods, withState } from '@ngrx/signals';
import { ActiveTournament } from './active-tournament.model';

type ActiveTournamentState = {
  activeTournament: ActiveTournament;
  isStarted: boolean;
};

const initialState: ActiveTournamentState = {
  activeTournament: {
    rounds: [],
  },
  isStarted: false,
};

export const activeTournamentStore = signalStore(
  { protectedState: false, providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    return {};
  })
);
