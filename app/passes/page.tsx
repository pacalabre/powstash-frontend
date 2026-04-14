"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPasses } from "@/services/passes";
import { Pass } from "../types/passTypes";
import { Spinner } from "@/components/ui/spinner";

export default function PassesPage() {
  const [passes, setPasses] = useState<Pass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPasses()
      .then((data) => {
        setPasses(data);
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
    <main className="mt-12">
      <h1 className="text-accent text-3xl p-[30px_0_20px_0] uppercase z-2 text-[35px] md:text-[50px] font-black [text-shadow:_-4px_6px_4px_rgba(0,0,0,0.25)]">
        Passes
      </h1>
      <section className="grid gap-5 grid-cols-1 md:grid-cols-2">
        {passes.map((pass) => (
          <Link
            href={`/passes/${pass.id}`}
            style={{ backgroundImage: `url(pass-logos/${pass.name}.png)` }}
            className="min-h-[220px] backdrop-blur-[7px] bg-transparent  bg-size-[50%] md:bg-size-[220px] bg-no-repeat ng-top bg-position-[center_center] border-solid border-bg-ring border-[1px]"
            key={pass.id}
          ></Link>
        ))}
      </section>
    </main>
  );
}
