import { getJwtToken } from "./auth";

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("files", file);
  const apiUrl = import.meta.env.VITE_APP_HOST_API_URL;
  const response = await fetch(`${apiUrl}/api/upload`, {
    method: "POST",
    body: formData,
    headers: {
      authorization: `Bearer ${getJwtToken()}`,
    },
  });
  const result = await response.json();
  return `${apiUrl}${result[0].url}`;
}
