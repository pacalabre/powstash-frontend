"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getPassById, getMountainsByPassId } from "@/services/passes";
import { Pass } from "@/app/types/passTypes";
import { Mountain } from "@/app/types/mountainTypes";

export default function PassPage() {
  const params = useParams();
  const [pass, setPass] = useState<Pass | null>(null);
  const [mountains, setMountains] = useState<Mountain[]>([]);
  const [passLoading, setPassLoading] = useState(true);
  const [mountainsLoading, setMountainsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      getPassById(params.id as string)
        .then((data) => {
          setPass(data);
          setPassLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setPassLoading(false);
        });

      getMountainsByPassId(params.id as string)
        .then((data) => {
          setMountains(data);
          setMountainsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setMountainsLoading(false);
        });
    }
  }, [params.id]);

  const loading = passLoading || mountainsLoading;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pass) return <div>Pass not found</div>;

  return (
    <main className="mt-12 flex justify-center flex-col items-center max-w-[700px] m-auto backdrop-blur-[7px] border-solid border-bg-ring border-[1px]">
      <h1 className="text-accent text-3xl py-5 uppercase z-2 text-[35px] md:text-[50px] font-black [text-shadow:_-4px_6px_4px_rgba(0,0,0,0.25)]">
        {pass.name}
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
