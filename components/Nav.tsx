"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Active = "gallery" | "calendar" | null;

export function NavLinks({ active }: { active: Active }) {
  return (
    <nav className="tabs" aria-label="Sections">
      <Link href="/" aria-current={active === "gallery" ? "page" : undefined}>Gallery</Link>
      <Link href="/calendar" aria-current={active === "calendar" ? "page" : undefined}>Calendar</Link>
    </nav>
  );
}

export default function Nav() {
  const pathname = usePathname();
  return <NavLinks active={pathname.startsWith("/calendar") ? "calendar" : "gallery"} />;
}
