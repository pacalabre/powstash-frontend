export interface Pass {
  id: string;
  name: string;
}

export interface Mountain {
  id: string;
  name: string;
}

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/passes`;

export async function getPasses(): Promise<Pass[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch passes");
  }

  return response.json();
}

export async function getPassById(id: string): Promise<Pass> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch pass");
  }

  return response.json();
}

export async function getMountainsByPassId(id: string): Promise<Mountain[]> {
  const response = await fetch(`${API_URL}/${id}/mountains`);

  if (!response.ok) {
    throw new Error("Failed to fetch mountains");
  }

  return response.json();
}
