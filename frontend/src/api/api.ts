// wrapper aound fetch to refresh access token when expired
export async function apiFetch(url: string, options: RequestInit = {}) {
  const urlComplete = import.meta.env.VITE_API_URL + url;
  const res = await fetch(urlComplete, { ...options });

  if (res.status === 401) {
    const refreshRes = await fetch("/api/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      return fetch(url, { ...options, credentials: "include" }); // retry original
    } else {
      throw new Error("Session expired");
    }
  }

  return res;
}
