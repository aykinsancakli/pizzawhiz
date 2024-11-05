const API_URL = import.meta.env.VITE_SERVER_DEVELOPMENT_URL;

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  if (!res.ok) throw Error('Failed getting menu');

  const data = await res.json();
  return data;
}
