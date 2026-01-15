"use client";

import { useState, useEffect } from "react";
import { getStates, State } from "@/services/states";

export default function StatesPage() {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStates()
      .then((data) => {
        setStates(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      <h1>States</h1>
      <ul>
        {states.map((state) => (
          <li key={state.id}>{state.name}</li>
        ))}
      </ul>
    </main>
  );
}
