"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getMountains, Mountain } from "@/services/mountains";
import { Button } from "@/components/ui/button";
import skierPic from "../public/skier-riding-lift.jpg";

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
      <section className={`flex flex-col h-[70vh] items-center justify-center`}>
        <h2 className="text-accent text-3xl p-[20px] uppercase z-2 text-[35px] md:text-[50px] max-w-[600px] font-black text-center [text-shadow:_-4px_6px_4px_rgba(0,0,0,0.25)]">
          what would you like to search by?
        </h2>
        <div className="flex flex-row gap-2 mt-[10px]">
          <Button
            className="p-[25px] text-lg"
            size="lg"
            variant="default"
            asChild
          >
            <Link href="/passes">Passes</Link>
          </Button>
          <Button
            className="p-[25px] text-lg"
            size="lg"
            variant="default"
            asChild
          >
            <Link href="/states">States</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
