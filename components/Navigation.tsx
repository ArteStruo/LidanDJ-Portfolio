"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import React from "react";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { path: "/", label: "Home" },
    { path: "/music", label: "Music" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)]"
    >
      <div className="max-w-[1108px] mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-10 bg-[#ff003f] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <svg className="size-5" fill="none" viewBox="0 0 24 24">
              <path d="M9 18V5L21 12L9 18Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span
            className="text-xl text-white uppercase tracking-widest"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            DJ Lidan
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className="relative px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <span
                  className={`text-sm tracking-[1.4px] relative z-10 uppercase transition-colors duration-200 ${
                    isActive ? "text-[#ff003f]" : "text-[#99a1af] hover:text-white"
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                >
                  {link.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-[rgba(255,0,63,0.1)] rounded-lg border border-[rgba(255,0,63,0.3)]"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}