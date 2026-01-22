import { Mountain } from "@/app/types/mountainTypes";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/mountains`;

export async function getMountains(): Promise<Mountain[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch mountains");
  }

  return response.json();
}

export async function getMountain(id: string): Promise<Mountain> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch mountain");
  }

  return response.json();
}
