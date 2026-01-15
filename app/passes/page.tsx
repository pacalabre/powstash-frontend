"use client";

import { useState, useEffect } from "react";
import { getPasses, Pass } from "@/services/passes";

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
    <main>
      <h1>Passes</h1>
      <ul>
        {passes.map((pass) => (
          <li key={pass.id}>{pass.name}</li>
        ))}
      </ul>
    </main>
  );
}
