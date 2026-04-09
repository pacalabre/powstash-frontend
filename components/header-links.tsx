"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

export function HeaderLinks() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/passes" || pathname === "/states")
    return null;

  return (
    <div className="flex gap-8 font-bold pt-[35px] flex-col md:flex-row">
      <Link
        className="md:hover:text-accent text-xl md:text-[25px]"
        href="/passes"
      >
        Passes
      </Link>
      <Link
        className="md:hover:text-accent text-xl md:text-[25px]"
        href="/states"
      >
        States
      </Link>
    </div>
  );
}
