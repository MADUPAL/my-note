import { NavLink } from "@/components/NavLink";
import { UserButton } from "@clerk/nextjs";
import { CalendarRange } from "lucide-react";
import React, { ReactNode } from "react";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="flex border-b bg-card py-2">
        <nav className="container flex items-center gap-6 text-sm font-medium">
          <div className="mr-auto flex items-center gap-2 font-semibold">
            <CalendarRange className="size-6" />
            <span className="sr-only md:not-sr-only">Calendor</span>
          </div>
          <NavLink href="/events">Events</NavLink>
          <NavLink href="/schedule">Schedule</NavLink>
          <div className="ml-auto size-10">
            <UserButton
              appearance={{ elements: { userButtonAvatarBox: "size-full" } }}
            />
          </div>
        </nav>
      </header>
      <main className="container my-6">{children}</main>
    </>
  );
};
export default PrivateLayout;
