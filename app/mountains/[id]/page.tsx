"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getMountain } from "@/services/mountains";
import { Mountain } from "@/app/types/mountainTypes";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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

  const exampleAddress = "123 Mountain Road, Ski Town, CO 80435";
  const imageUrl = `/mountain-logos/${mountain.name}.png`;

  const handleDirectionsClick = () => {
    const encodedAddress = encodeURIComponent(exampleAddress);
    window.open(`maps://maps.apple.com/?daddr=${encodedAddress}`, "_blank");
  };

  return (
    <main className="mt-12 flex justify-center flex-col items-center max-w-[700px] m-auto backdrop-blur-[15px] border-solid border-bg-ring border-[1px] p-[20px]">
      {imageUrl && (
        <Image src={imageUrl} alt="image" width={200} height={200} />
      )}

      <section>
        <p>{exampleAddress}</p>
        <Button onClick={handleDirectionsClick} className="max-w-[150px]">
          Get Directions
        </Button>
      </section>
      <section className="flex justify-center">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </section>
      <section>
        <h2>Weather</h2>
        <p>Current Conditions: Sunny, 28°F</p>
        <p>Wind: 5 mph NW</p>
        <p>Snow Base: 48 inches</p>
      </section>
    </main>
  );
}
