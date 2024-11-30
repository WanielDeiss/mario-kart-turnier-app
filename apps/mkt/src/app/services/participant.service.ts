import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import API_ROUTES from '../app-api.routes';
import { lastValueFrom } from 'rxjs';
import {
  ParticipantResponse,
  ParticpantListResonse,
} from '../store/participant.model';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  httpClient = inject(HttpClient);

  addToTourament(tournamentId: number, participantName: string) {
    return lastValueFrom(
      this.httpClient.post<ParticipantResponse>(
        API_ROUTES.post.addParticipantToTournament(tournamentId),
        { name: participantName }
      )
    );
  }

  getAllByTournamentId(tournamentId: number) {
    return lastValueFrom(
      this.httpClient.get<ParticpantListResonse>(
        API_ROUTES.get.getAllParticipantsByTournamentId(tournamentId)
      )
    );
  }
}
