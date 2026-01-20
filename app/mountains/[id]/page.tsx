"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getMountain, Mountain } from "@/services/mountains";

export default function MountainPage() {
  const params = useParams();
  const [mountain, setMountain] = useState<Mountain | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMountain(params.id as string)
      .then((data) => {
        setMountain(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!mountain) return <div>Mountain not found</div>;

  return (
    <main>
      <h1>{mountain.name}</h1>
    </main>
  );
}