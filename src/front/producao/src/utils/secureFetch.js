import { getToken, logout } from "./auth";

export async function secureFetch(url, options = {}) {
  const token = getToken();

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const finalOptions = {
    ...options,
    headers,
    credentials: "include",
  };

  try {
    const response = await fetch(url, finalOptions);

    if (response.status === 403) {
      localStorage.setItem("logoutReason", "expired");
      logout(); // já redireciona para /login
    }

    return response;
  } catch (error) {
    console.error("Erro na requisição protegida:", error);
    throw error;
  }
}
