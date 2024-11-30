export interface BlockParticipant {
  name: string;
  isWinner: boolean;
}

export interface Block {
  name: string;
  participants: BlockParticipant[];
}

export interface Round {
  name: string;
  blocks: Block[];
}

export interface ActiveTournament {
  rounds: Round[];
}

export interface ActiveTournamentResponse extends ActiveTournament {
  id: number;
}
