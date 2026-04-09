import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { HeaderLinks } from "../header-links";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-[60px] right-[12px] z-50 bg-transparent border-none flex md:hidden"
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
