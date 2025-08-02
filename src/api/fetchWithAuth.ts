import Cookies from "js-cookie";
import { authApi, BASE_URL } from "./authApi";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  let token = Cookies.get("access_token");

  let res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401) {
    const refreshToken = Cookies.get("refresh_token");
    if (!refreshToken) throw new Error("No refresh token");

    try {
      const newTokens = await authApi.refresh(refreshToken);
      Cookies.set("access_token", newTokens.access_token);
      Cookies.set("refresh_token", newTokens.refresh_token);
      token = newTokens.access_token;

      res = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch {
      throw new Error("Unauthorized");
    }
  }

  const data = await res.json();
  return { data, headers: res.headers };
}
