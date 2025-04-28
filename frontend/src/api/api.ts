// wrapper aound fetch to refresh access token when expired
export async function apiFetch(url: string, options: RequestInit = {}) {
  const urlComplete = import.meta.env.VITE_API_URL + url;
  console.log(urlComplete, options);
  const res = await fetch(urlComplete, options);

  if (res.status === 401) {
    const refreshRes = await fetch(
      import.meta.env.VITE_API_URL + "/api/auth/refresh",
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (refreshRes.ok) {
      return fetch(urlComplete, { ...options, credentials: "include" }); // retry original
    } else {
      throw new Error("Session expired");
    }
  }

  return res;
}
