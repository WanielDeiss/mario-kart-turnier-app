const API_BASE = '/api';

export default {
  get: {
    tournaments: `${API_BASE}/tournament`,
  },
  post: {
    tournaments: `${API_BASE}/tournament`,
  },
  delete: {
    tournaments: (id: number) => `${API_BASE}/tournament/${id}`,
  },
};
