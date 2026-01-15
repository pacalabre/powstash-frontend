export interface Pass {
  id: string;
  name: string;
  // Add more fields as needed based on API response
}

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/passes`;

export async function getPasses(): Promise<Pass[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch passes");
  }

  return response.json();
}
