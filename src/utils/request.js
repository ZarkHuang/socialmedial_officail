import { getJwtToken } from "../apis/auth";

export async function request(
  url,
  { method = "GET", body, headers = {}, auth = true } = {}
) {
  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const fullUrl = `${baseUrl}${url}`;
  const response = await fetch(fullUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
      ...(auth && { Authorization: `Bearer ${getJwtToken()}` }),
    },
    body: body instanceof FormData ? body : JSON.stringify(body),
  });

  if (!response.ok) {
    const errorInfo = await response.text();
    throw new Error(`HTTP error ${response.status}: ${errorInfo}`);
  }

  return await response.json();
}
