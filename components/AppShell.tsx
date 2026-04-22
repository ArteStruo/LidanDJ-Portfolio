"use client";

import { usePathname } from "next/navigation";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/footer";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <main className="flex-1 flex flex-col">{children}</main>;
  }

  return (
    <>
      <Navigation />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
