import Link from "next/link";
import { Suspense } from "react";
import Nav, { NavLinks } from "./Nav";

export default function SiteHeader() {
  return (
    <header className="mast rise">
      <Link className="brand" href="/">Learning UX Laws</Link>
      <Suspense fallback={<NavLinks active={null} />}>
        <Nav />
      </Suspense>
    </header>
  );
}
