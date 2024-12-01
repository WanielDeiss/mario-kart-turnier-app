const API_BASE = '/api';

export default {
  get: {
    tournaments: `${API_BASE}/tournament`,
    tournament: (id: number) => `${API_BASE}/tournament/${id}`,
  },
  post: {
    tournaments: `${API_BASE}/tournament`,
  },
  patch: {
    startTournament: (id: number) => `${API_BASE}/tournament/${id}/start`,
    pauseTournament: (id: number) => `${API_BASE}/tournament/${id}/pause`,
  },
  delete: {
    tournaments: (id: number) => `${API_BASE}/tournament/${id}`,
  },
};
