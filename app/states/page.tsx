"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getStates } from "@/services/states";
import { State } from "../types/stateTypes";
import { Spinner } from "@/components/ui/spinner";

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

  if (loading) {
    return (
      <Spinner className="size-8 absolute left-0 right-0 top-[45%] text-accent mx-auto" />
    );
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="mt-12 flex justify-center flex-col items-center max-w-[700px] m-auto backdrop-blur-[15px] border-solid border-bg-ring border-[1px]">
      <h1 className="text-accent text-3xl p-[30px_0_20px_0] uppercase z-2 text-[35px] md:text-[50px] font-black [text-shadow:_-4px_6px_4px_rgba(0,0,0,0.25)]">
        States
      </h1>
      <section className="flex flex-col gap-5 text-[20px] font-bold pt-0 pb-[30px]">
        {states.map((state) => (
          <Link
            key={state.id}
            href={`/states/${state.id}`}
            className="capitalize hover:underline"
          >
            {state.name}
          </Link>
        ))}
      </section>
    </main>
  );
}
