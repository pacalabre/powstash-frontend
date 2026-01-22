export interface State {
  id: string;
  name: string;
}

export interface Mountain {
  id: string;
  name: string;
}

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/states`;

export async function getStates(): Promise<State[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch states");
  }

  return response.json();
}

export async function getMountainsByStateId(id: string): Promise<Mountain[]> {
  const response = await fetch(`${API_URL}/${id}/mountains`);

  if (!response.ok) {
    throw new Error("Failed to fetch mountains");
  }

  return response.json();
}
