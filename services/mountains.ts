import { Mountain } from "@/app/types/mountainTypes";
import { Forecast } from "@/app/types/weatherTypes";

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

export async function getMountainWeather(
  lat: number,
  lon: number,
): Promise<any> {
  const weatherUrl = `${process.env.NEXT_PUBLIC_WEATHER_URL}/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;

  const response = await fetch(weatherUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }
  return response.json();
}

export async function getMountainForecast(
  lat: number,
  lon: number,
): Promise<Forecast> {
  const forecastUrl = `${process.env.NEXT_PUBLIC_WEATHER_URL}/forecast/daily?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;

  const response = await fetch(forecastUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch forecast");
  }
  return response.json();
}

export async function getResortStatus(mountainName: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RESORT_STATUS_URL}/${mountainName}`,
  );
  if (!response) {
    throw new Error("Failed to fecth resort status");
  }
  return response.json();
}
