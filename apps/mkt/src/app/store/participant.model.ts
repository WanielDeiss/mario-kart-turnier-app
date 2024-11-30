export interface Participant {
  name: string;
  tournamentId: number;
}

export interface ParticipantResponse extends Participant {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ParticpantListResonse {
  participants: string[];
  tournamentId: number;
}
