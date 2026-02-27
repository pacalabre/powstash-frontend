"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  getMountain,
  getMountainForecast,
  getMountainWeather,
  getResortStatus,
} from "@/services/mountains";
import { Mountain } from "@/app/types/mountainTypes";
import { CurrentWeather, Forecast } from "@/app/types/weatherTypes";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import { Wind, CloudRainWind, Cloud, Snowflake, Sun } from "lucide-react";

function formatDay(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "short",
  });
}

function getWeatherIcon(description: string) {
  const desc = description.toLowerCase();
  switch (true) {
    case desc.includes("rain"):
      return <CloudRainWind />;
    case desc.includes("cloud"):
      return <Cloud />;
    case desc.includes("snow"):
      return <Snowflake />;
    case desc.includes("sun"):
      return <Sun />;
    default:
      return null;
  }
}

export default function MountainPage() {
  const params = useParams();
  const [mountain, setMountain] = useState<Mountain>();
  const [mountainLiftStatus, setMountainLiftStatus] = useState<any>(null);
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function callMountainWeatherService(latitude: number, longitude: number) {
    getMountainWeather(latitude, longitude).then((data) => {
      setWeather(data);
    });
  }

  function callMountainForecastService(latitude: number, longitude: number) {
    getMountainForecast(latitude, longitude).then((data) => {
      setForecast(data);
    });
  }

  function callResortStatusService(mountainName: string) {
    getResortStatus(mountainName).then((data) => {
      console.log("resort data", data);
      setMountainLiftStatus(data.lifts);
      return data;
    });
  }

  useEffect(() => {
    const fetchMountain = async () => {
      try {
        const data = await getMountain(params.id as string);
        setMountain(data);
        setLoading(false);
        callResortStatusService(data.name.toLowerCase());
        if (data.latitude && data.longitude) {
          callMountainWeatherService(
            Number(data.latitude),
            Number(data.longitude),
          );
          callMountainForecastService(
            Number(data.latitude),
            Number(data.longitude),
          );
        }
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchMountain();
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
    <main className="mt-12 flex justify-center flex-col items-center max-w-[700px] m-auto backdrop-blur-[15px] border border-grey p-[20px]">
      {imageUrl && (
        <Image src={imageUrl} alt="image" width={200} height={200} />
      )}

      <section className="flex justify-center">
        <p>{mountain.description}</p>
      </section>
      <section className="w-full">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-b border-black">
            <AccordionTrigger className="text-lg font-bold">
              Address and Directions
            </AccordionTrigger>
            <AccordionContent>
              <p>{mountain.address}</p>

              <Button onClick={handleDirectionsClick} className="max-w-[150px]">
                Open in apple maps
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-b border-black">
            <AccordionTrigger className="text-lg font-bold">
              Weather
            </AccordionTrigger>
            <AccordionContent>
              {!weather ? (
                <div className="flex items-center gap-2">
                  <Spinner />
                  <span>Loading weather...</span>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{mountain.name}</CardTitle>
                      <CardDescription>Current Conditions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                          {getWeatherIcon(
                            weather.weather[0]?.description || "",
                          )}
                          <p>{weather.weather[0]?.description}</p>
                        </div>
                        <p>
                          High: {Math.round(weather.main.temp_max)}°F / Low:{" "}
                          {Math.round(weather.main.temp_min)}°F
                        </p>
                        <p>
                          Feels like: {Math.round(weather.main.feels_like)}°F
                        </p>

                        <p>
                          {" "}
                          <Wind className="text-slate-600" />
                          Wind: {Math.round(weather.wind.speed)} mph
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <div>
                    <h3 className="font-bold">7-Day Forecast</h3>
                    {!forecast ? (
                      <div className="flex items-center gap-2">
                        <Spinner />
                        <span>Loading forecast...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {forecast.list.map((day) => (
                          <div key={day.dt} className="flex flex-col gap-4">
                            <span className="w-12">{formatDay(day.dt)}</span>
                            <span>
                              {Math.round(day.temp.min)}°F /
                              {Math.round(day.temp.max)}°F
                            </span>
                            <div className="flex flex-col">
                              {getWeatherIcon(
                                day.weather[0]?.description || "",
                              )}
                              <p>{day.weather[0]?.description}</p>
                            </div>
                            <span>{Math.round(day.speed)} mph</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-b border-black">
            <AccordionTrigger className="text-lg font-bold">
              Lift Report
            </AccordionTrigger>
            <AccordionContent>
              {mountainLiftStatus && (
                <>
                  <div className="flex gap-4 text-lg">
                    <p>
                      Open:
                      {mountainLiftStatus.stats.open === 0
                        ? mountainLiftStatus.stats.scheduled
                        : mountainLiftStatus.stats.open}
                    </p>
                    <p>Closed: {mountainLiftStatus.stats.closed}</p>
                  </div>
                  {Object.entries(mountainLiftStatus.status).map(
                    ([liftName, liftStatus]) => (
                      <p key={liftName} className="flex items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-full ${
                            (liftStatus as string).toLowerCase() === "closed"
                              ? "bg-red-500"
                              : "bg-green-500"
                          }`}
                        />
                        {liftName}: {liftStatus as string}
                      </p>
                    ),
                  )}
                </>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-b border-black">
            <AccordionTrigger className="text-lg font-bold">
              Local Knowledge
            </AccordionTrigger>
            <AccordionContent>
              <p>{mountain.localKnowledge}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-bold">
              Pass Information
            </AccordionTrigger>
            <AccordionContent>
              <p>Day prices and pass</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </main>
  );
}
