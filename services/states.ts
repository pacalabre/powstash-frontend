export interface State {
  id: string;
  name: string;
  // Add more fields as needed based on API response
}

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/states`;

export async function getStates(): Promise<State[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch states");
  }

  return response.json();
}
