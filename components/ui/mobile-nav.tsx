"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { HeaderLinks } from "../header-links";

export function MobileNav() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/passes" || pathname === "/states")
    return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-[60px] right-[12px] z-50 bg-transparent border-none flex md:hidden hover:bg-transparent"
          >
            <Menu className="size-7" />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="flex flex-col gap-4 mt-4 p-4">
          <HeaderLinks></HeaderLinks>
        </div>
      </SheetContent>
    </Sheet>
  );
}
