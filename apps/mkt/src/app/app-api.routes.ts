const API_BASE = '/api';

export default {
  get: {
    getAllParticipantsByTournamentId: (tournamentId: number) =>
      `${API_BASE}/tournament/${tournamentId}/participant`,
  },
  post: {
    addParticipantToTournament: (tournamentId: number) =>
      `${API_BASE}/tournament/${tournamentId}/participant`,
  },
};
