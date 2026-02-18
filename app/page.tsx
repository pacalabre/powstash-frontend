"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
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
