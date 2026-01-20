"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPasses, Pass } from "@/services/passes";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="mt-12">
      <h1 className="text-accent text-3xl py-5 uppercase z-2 text-[35px] md:text-[50px] font-black [text-shadow:_-4px_6px_4px_rgba(0,0,0,0.25)]">
        Passes
      </h1>
      <section className="grid gap-5 grid-cols-1 md:grid-cols-3">
        {passes.map((pass) => (
          <Card className="backdrop-blur-[7px] bg-transparent" key={pass.id}>
            <CardHeader className="min-h-[175px]">
              <CardTitle>{pass.name}</CardTitle>
            </CardHeader>
            <CardFooter className="bg-white">
              <div>
                <p className="font-bold text-lg capitalize mb-2">{pass.name}</p>
                <Button asChild>
                  <Link href={`/mountains/${pass.id}`}>View Mountains</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
}
