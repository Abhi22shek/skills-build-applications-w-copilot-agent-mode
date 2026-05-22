const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
};

export const fetchCollection = async (endpoint) => {
  const response = await fetch(`${apiBaseUrl}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
  }

  const payload = await response.json();
  return normalizeCollection(payload);
};
