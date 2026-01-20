"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
    <main className="mt-12">
      <h1 className="text-accent text-3xl py-5 uppercase z-2 text-[35px] md:text-[50px] font-black [text-shadow:_-4px_6px_4px_rgba(0,0,0,0.25)]">
        States
      </h1>
      <section className="flex flex-col gap-5 text-[30px] font-bold">
        {states.map((state) => (
          <Link
            key={state.id}
            href={`/states/${state.id}`}
            className="text-accent"
          >
            {state.name}
          </Link>
        ))}
      </section>
    </main>
  );
}
