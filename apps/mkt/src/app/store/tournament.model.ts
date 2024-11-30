export interface Tournament {
  name: string;
  startDate: Date;
  isStarted: boolean;
}

export interface TournamentResponse extends Tournament {
  id: number;
  isExpired: boolean;
  createdAt: Date;
  updatedAt: Date;
}
