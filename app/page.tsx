"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getMountains, Mountain } from "@/services/mountains";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [mountains, setMountains] = useState<Mountain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getMountains()
      .then((data) => {
        setMountains(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading mountains</div>;

  return (
    <main>
      <h1></h1>
      <h2>what would you like to search by?</h2>
      <Button size="lg" variant="default" asChild>
        <Link href="/passes">Passes</Link>
      </Button>
      <Button size="lg" variant="default" asChild>
        <Link href="/states">States</Link>
      </Button>
    </main>
  );
}
