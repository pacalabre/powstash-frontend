"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  getMountain,
  getMountainWeather,
  getResortStatus,
} from "@/services/mountains";
import { Mountain } from "@/app/types/mountainTypes";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export default function MountainPage() {
  const params = useParams();
  const [mountain, setMountain] = useState<Mountain>();
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

  useEffect(() => {
    if (mountain?.latitude && mountain.longitude) {
      getMountainWeather(mountain.latitude, mountain.latitude).then((data) => {
        console.log("weather", data);
      });
    }

    if (mountain?.name) {
      getResortStatus(mountain.name.toLowerCase()).then((data) => {
        console.log("resort data", data);
      });
    }
  }, [mountain]);

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
      <Button
        onClick={handleDirectionsClick}
        className="max-w-[150px] m-[20px]"
      >
        Open in apple maps
      </Button>
      <section className="flex justify-center">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </section>
      <section className="w-full max-w-[500px]">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Address</AccordionTrigger>
            <AccordionContent>
              <p>{exampleAddress}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Weather</AccordionTrigger>
            <AccordionContent>
              <p>Current Conditions: Sunny, 28°F</p>
              <p>Wind: 5 mph NW</p>
              <p>Snow Base: 48 inches</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Trail Report</AccordionTrigger>
            <AccordionContent>
              <p>80 inch base</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Local Knowledge</AccordionTrigger>
            <AccordionContent>
              <p>80 inch base</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Lodging</AccordionTrigger>
            <AccordionContent>
              <p>List from airbnb or expedia</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Pass Information</AccordionTrigger>
            <AccordionContent>
              <p>Day prices and pass</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </main>
  );
}
