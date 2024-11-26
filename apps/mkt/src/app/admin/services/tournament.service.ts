import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import API_ROUTES from '../admin-api.routes';
import { Tournament, TournamentResponse } from '../../store/tournament.model';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  readonly httpClient = inject(HttpClient);

  getAll() {
    return lastValueFrom(
      this.httpClient.get<TournamentResponse[]>(API_ROUTES.get.tournaments)
    );
  }

  addTournament(tournament: Tournament) {
    return lastValueFrom(
      this.httpClient.post<TournamentResponse>(
        API_ROUTES.post.tournaments,
        tournament
      )
    );
  }

  deleteTournament(id: number) {
    return lastValueFrom(
      this.httpClient.delete<TournamentResponse>(
        API_ROUTES.delete.tournaments(id)
      )
    );
  }
}
