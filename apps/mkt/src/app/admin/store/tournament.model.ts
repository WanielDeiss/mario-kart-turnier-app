export interface Tournament {
  name: string;
  startDate: Date;
}

export interface TournamentResponse extends Tournament {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
