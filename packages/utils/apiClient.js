export function createApiClient(baseURL) {
  return {
    async get(path, token) {
      const res = await fetch(`${baseURL}${path}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      return res.json();
    },
    async post(path, data, token) {
      const res = await fetch(`${baseURL}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(data)
      });
      return res.json();
    }
  };
}
