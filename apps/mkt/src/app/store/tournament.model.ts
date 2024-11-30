export interface Tournament {
  name: string;
  startDate: Date;
}

export interface TournamentResponse extends Tournament {
  id: number;
  isExpired: boolean;
  createdAt: Date;
  updatedAt: Date;
}
