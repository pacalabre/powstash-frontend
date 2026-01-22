"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getMountainsByStateId, Mountain } from "@/services/states";

export default function StatePage() {
  const params = useParams();
  const [mountains, setMountains] = useState<Mountain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      getMountainsByStateId(params.id as string)
        .then((data) => {
          setMountains(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="mt-12 flex justify-center flex-col items-center max-w-[700px] m-auto backdrop-blur-[7px] border-solid border-bg-ring border-[1px]">
      <h1 className="text-accent text-3xl py-5 uppercase z-2 text-[35px] md:text-[50px] font-black [text-shadow:_-4px_6px_4px_rgba(0,0,0,0.25)]">
        Mountains
      </h1>
      <section className="flex flex-col gap-5 text-[30px] font-bold my-[20px]">
        {mountains.map((mountain) => (
          <Link
            key={mountain.id}
            href={`/mountains/${mountain.id}`}
            className="text-accent"
          >
            {mountain.name}
          </Link>
        ))}
      </section>
    </main>
  );
}